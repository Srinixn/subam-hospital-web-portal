// ─────────────────────────────────────────────
//  Database seed script
//  Seeds the default admin user, departments,
//  and FAQ knowledge base. Idempotent (skips
//  existing records).
//  Run: npm run seed
// ─────────────────────────────────────────────
import 'dotenv/config';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

const SALT_ROUNDS = 12;

// Default admin credentials — change the password after first login!
const DEFAULT_ADMIN = {
  name: 'Demo Admin',
  email: 'admin@example.com',
  password: 'Demo@2026',
};

// ─────────────────────────────────────────
//  Hospital Departments
// ─────────────────────────────────────────
const DEPARTMENTS = [
  { name: 'General Inquiry', description: 'General questions about the hospital' },
  { name: 'Obstetrics', description: 'Pregnancy care, deliveries, and maternal health' },
  { name: 'Gynaecology', description: 'Women\'s health services across all ages' },
  { name: 'Paediatrics', description: 'Healthcare for infants, children, and adolescents' },
  { name: 'Radiology', description: 'Diagnostic imaging: ultrasound, X-ray, CT scan' },
  { name: 'Antenatal Care', description: 'Structured pregnancy monitoring programs' },
  { name: 'Postnatal Care', description: 'Postpartum recovery and breastfeeding support' },
  { name: 'Fertility Care', description: 'IVF, reproductive medicine, and fertility treatments' },
  { name: 'Newborn Care', description: 'Neonatal ICU and specialized newborn services' },
  { name: 'General Surgery', description: 'Laparoscopic, endoscopic, and general surgical procedures' },
  { name: 'General Medicine', description: 'Internal medicine and diabetology' },
  { name: 'Cardiology', description: 'Heart health and interventional cardiology' },
  { name: 'Orthopaedics', description: 'Joint replacement and bone health' },
];

// ─────────────────────────────────────────
//  FAQ Knowledge Base
//  These entries power the chatbot's RAG pipeline.
// ─────────────────────────────────────────
const FAQ_ENTRIES = [
  {
    title: 'Hospital Visiting Hours',
    content: 'Demo Hospital visiting hours are:\n* **General Wards**: 10:00 AM to 12:00 PM and 4:00 PM to 6:00 PM daily.\n* **ICU**: 11:00 AM to 11:30 AM and 5:00 PM to 5:30 PM (max 2 visitors).\n* **NICU**: Decided by the treating doctor.\n\nPlease note that visiting policies may change during pandemic or outbreak situations.',
    department: 'General Inquiry',
    tags: 'visiting hours,visit,timing,visitor,ICU,NICU',
  },
  {
    title: 'Hospital Location and Address',
    content: 'Demo Hospital is situated at the following address:\n* **Address**: No. 6/1, Example Main Road, Example Town, Example City – 000000, Example State, India.\n* **Landmark**: Conveniently located opposite the Example Town Bus Stand.\n* **Parking**: Free dedicated parking spaces are available on-site.',
    department: 'General Inquiry',
    tags: 'location,address,directions,map,where,example-city',
  },
  {
    title: 'Contact and Emergency Numbers',
    content: 'You can contact Demo Hospital using the details below:\n* **General & Appointments**: +00 00000 00000\n* **Emergency Desk**: Same numbers (operates 24 hours, 7 days a week)\n* **Official Email**: info@example.com',
    department: 'General Inquiry',
    tags: 'phone,call,contact,emergency,number,helpline',
  },
  {
    title: 'How to Book an Appointment',
    content: 'You can book an appointment at Demo Hospital in several ways:\n* **Phone Call**: Call us at **+00 00000 00000** or **+00 00000 00000**.\n* **Website**: Submit a query using the Contact form on our site.\n* **In-Person**: Visit the reception desk on the Ground Floor.\n* **Virtual Assistant**: Complete the fallback form in this chat widget.\n\n*OPD appointments are scheduled from Monday to Saturday, 9:00 AM - 1:00 PM and 4:00 PM - 8:00 PM.*',
    department: 'General Inquiry',
    tags: 'appointment,book,schedule,booking,consultation,walk-in',
  },
  {
    title: 'Parking Information',
    content: 'Our parking facilities details:\n* **Cost**: Fully complimentary (free of charge) for all patients and visitors.\n* **Space**: Ample space for two-wheelers (motorcycles/scooters) and four-wheelers (cars/SUVs).\n* **Access**: Wheelchair-accessible parking slots are reserved right next to the main entrance.',
    department: 'General Inquiry',
    tags: 'parking,car,vehicle,bike,two-wheeler,accessible',
  },
  {
    title: 'Billing and Payment Methods',
    content: 'Demo Hospital accepts multiple secure payment channels:\n* **UPI & Digital**: GPay, PhonePe, Paytm, and all banking apps.\n* **Cards**: All major Credit and Debit cards (Visa, Mastercard, RuPay).\n* **Cash**: Accepted at all counter billing desks.\n* **Net Banking**: Available for inpatient balance settlements.\n\n*For billing questions, please visit the main accounts desk on the Ground Floor.*',
    department: 'General Inquiry',
    tags: 'billing,payment,insurance,cashless,UPI,card,TPA,cost',
  },
  {
    title: 'Insurance and Cashless Hospitalization',
    content: 'For cashless insurance claims at Demo Hospital:\n* **TPA Desk**: Located on the Ground Floor near reception.\n* **Documents Needed**: Health Insurance Card, Policy Document, and a valid photo ID (Aadhaar/PAN).\n* **Pre-Auth**: Our desk handles all pre-authorization procedures directly with your provider.\n\n*Note: Out-of-pocket charges might apply for procedural exclusions or room category upgrades.*',
    department: 'General Inquiry',
    tags: 'insurance,cashless,TPA,health insurance,policy,claim',
  },
  {
    title: 'Hospital Facilities Overview',
    content: 'Demo Hospital features modern healthcare facilities:\n* **Capacity**: 50+ bed multi-speciality setup.\n* **Neonatal ICU**: Specialized Level III NICU for premature infants.\n* **Diagnostics**: Full-service diagnostic radiology (Ultrasound, Doppler, X-ray) and pathology lab.\n* **Emergency Care**: 24/7 emergency services, critical ICU, and a 24/7 in-house pharmacy.\n* **Rooms**: Premium air-conditioned private rooms and clean semi-private wards.',
    department: 'General Inquiry',
    tags: 'facilities,rooms,ICU,NICU,OT,pharmacy,lab,bed,amenities',
  },
  {
    title: 'Obstetrics Department',
    content: 'Our Obstetrics department offers high-quality pregnancy and maternal care:\n* **Pre-natal Monitoring**: Regular milestone checks, gestational checks, and blood diagnostics.\n* **Delivery Services**: Normal deliveries, painless labor (epidural), and cesarean sections.\n* **Specialist Care**: High-risk pregnancy management and continuous fetal monitoring.\n* **Leadership**: Headed by Dr. A. Example (MBBS, MD OG, Fellowship in Reproductive Medicine) with over 25,000 deliveries.',
    department: 'Obstetrics',
    tags: 'obstetrics,pregnancy,delivery,cesarean,c-section,prenatal,high-risk',
  },
  {
    title: 'Gynaecology Department',
    content: 'Our Gynaecology department offers comprehensive wellness care for women:\n* **General Health**: Annual exams, pap smear screenings, and menopause management.\n* **Conditions Treated**: PCOS/PCOD, irregular periods, uterine fibroids, and endometriosis.\n* **Advanced Procedures**: Minimally invasive laparoscopic surgeries and keyhole procedures.\n\n*OPD consultations are available Monday to Saturday.*',
    department: 'Gynaecology',
    tags: 'gynecology,women health,PCOS,menstrual,fibroid,laparoscopy,pap smear',
  },
  {
    title: 'Paediatrics Department',
    content: 'Our Paediatrics department provides pediatric care from birth to adolescence:\n* **Newborn Care**: Screenings, vaccinations, and neonatal follow-ups.\n* **Development**: Growth tracking, dietary counseling, and physical milestone monitoring.\n* **Specialists**: Led by experienced paediatricians Dr. A. Example and Dr. A. Example.',
    department: 'Paediatrics',
    tags: 'paediatrics,pediatrics,children,child,baby,vaccination,immunization,growth',
  },
  {
    title: 'Radiology and Diagnostic Imaging',
    content: 'Our Radiology unit features state-of-the-art diagnostic imaging:\n* **Fetal Medicine**: Milestone scans including NT scan, Anomaly scan, and Growth scan.\n* **Ultrasound**: High-resolution 2D/3D/4D ultrasound and Color Doppler scans.\n* **General Imaging**: Digital radiography and pathology services.\n* **Expertise**: Headed by Dr. A. Example (DMRD, DNB RD), specialist in Fetal Medicine.',
    department: 'Radiology',
    tags: 'radiology,ultrasound,scan,X-ray,imaging,doppler,fetal medicine,NT scan',
  },
  {
    title: 'Fertility Care and IVF',
    content: 'Example Fertility Center provides advanced reproductive medicine:\n* **Treatments**: IVF (In Vitro Fertilization), IUI (Intrauterine Insemination), and ICSI.\n* **Evaluation**: Complete fertility diagnostics for both male and female partners.\n* **Advanced Care**: Egg freezing, hormone treatments, and embryology lab support.\n\n*All consultations are fully confidential. Call +00 00000 00000 to book a slot.*',
    department: 'Fertility Care',
    tags: 'fertility,IVF,IUI,ICSI,infertility,reproductive,conception,egg freezing',
  },
  {
    title: 'Newborn and NICU Care',
    content: 'Our specialized neonatal unit is fully prepared for critical care:\n* **NICU Level**: Level III Neonatal ICU for premature and high-risk infants.\n* **Support Systems**: Advanced ventilators, incubators, phototherapy, and cardiac monitoring.\n* **Staffing**: Round-the-clock coverage by neonatologists and ICU-trained nurses.',
    department: 'Newborn Care',
    tags: 'NICU,neonatal,newborn,premature,incubator,neonatology,baby care',
  },
  {
    title: 'Antenatal (Pregnancy) Care Program',
    content: 'Our Antenatal Care program provides structured, step-by-step pregnancy monitoring:\n* **Check-Ups**: Monthly visits in early pregnancy, transitioning to bi-weekly in the third trimester.\n* **Diagnostics**: Routine blood tests, anomaly scans, and diabetes screening.\n* **Support**: Nutrition & diet guides, prenatal exercise tips, and parenting workshops.\n* **Extras**: Educational materials and pregnancy tracking kits.',
    department: 'Antenatal Care',
    tags: 'antenatal,prenatal,pregnancy care,check-up,monitoring,trimester',
  },
  {
    title: 'Postnatal Care Services',
    content: 'Our Postnatal Care services provide comprehensive support after birth:\n* **Maternal Health**: Postpartum recovery check-ups, physical therapy, and mental health screenings.\n* **Baby Health**: Lactation/breastfeeding counseling, newborn checks, and immunization planning.\n* **Schedule**: Structured visits at 1 week, 6 weeks, and 3 months after delivery.',
    department: 'Postnatal Care',
    tags: 'postnatal,postpartum,breastfeeding,lactation,recovery,follow-up',
  },
  {
    title: 'Hospital Working Hours and OPD Timings',
    content: 'Demo Hospital timings and hours:\n* **Emergency Services**: Open 24 Hours, 7 Days a week\n* **OPD Consultation**: Monday to Saturday, 9:00 AM - 1:00 PM & 4:00 PM - 8:00 PM\n* **Sunday OPD**: Closed (Emergencies handled via ER)\n* **Pharmacy**: Open 24/7\n* **Laboratory**: 24/7 for emergency tests; routine collections from 7:00 AM - 9:00 PM',
    department: 'General Inquiry',
    tags: 'OPD,timings,working hours,schedule,open,closed,pharmacy,lab',
  },
  {
    title: 'List of Departments and Specialities',
    content: 'Demo Hospital offers services across the following specialities:\n* **Obstetrics & Gynaecology**\n* **Paediatrics & Newborn Care (NICU)**\n* **Radiology & Fetal Medicine**\n* **General Surgery** (Laparoscopic & Endoscopic)\n* **General Medicine & Diabetology**\n* **Cardiology**\n* **Orthopaedics**\n* **Fertility Care** (via Example Fertility Center)\n\nEach department is staffed by qualified medical specialists.',
    department: 'General Inquiry',
    tags: 'departments,specialities,services,list,what departments',
  },
  {
    title: 'Medical Records and Reports',
    content: 'To request medical records and lab reports:\n* **Counter**: Visit the Medical Records department on the Ground Floor.\n* **Identity Check**: Bring a valid photo ID card.\n* **Timeline**: Reports are ready within 24-48 hours of test collection.\n* **Digital Copy**: Request copies via email during registration.\n* **Archive Retrieval**: Past medical charts take 2-3 working days.',
    department: 'General Inquiry',
    tags: 'medical records,reports,lab results,test results,documents,copy',
  },
  {
    title: 'Admission Process',
    content: 'To get admitted at Demo Hospital:\n* **Consultation**: Get an admission recommendation from our OPD doctor.\n* **Counter Visit**: Go to the Admission Counter near the reception.\n* **Documents**: Provide a valid photo ID and health insurance details.\n* **Room Choice**: Choose your room type (General Ward, Semi-Private, Private AC).\n* **Form & Deposit**: Complete the admission form and pay the advance deposit.\n\n*Note: Emergency admissions are handled directly and immediately through our 24/7 ER.*',
    department: 'General Inquiry',
    tags: 'admission,admit,hospitalization,room,ward,process,check-in',
  },
  {
    title: 'Discharge Process',
    content: 'The discharge process takes approximately 2-4 hours after the doctor approves discharge:\n* **Discharge Summary**: The doctor prepares your discharge summary and prescriptions.\n* **Counseling**: The nursing staff guides you on medications and follow-up care.\n* **Billing Desk**: Pay the final bill at the billing counter and collect receipts.\n* **Documents**: Collect your discharge summary copy and instructions.\n\n*Note: For insurance/cashless patients, discharge may take longer while waiting for TPA pre-auth approval.*',
    department: 'General Inquiry',
    tags: 'discharge,checkout,bill settlement,leave,go home',
  },
  {
    title: 'Ambulance Services',
    content: 'Demo Hospital Ambulance Services details:\n* **Hotline**: Call **+00 00000 00000** (available 24/7)\n* **Capabilities**: Fully equipped with Basic Life Support (BLS) equipment.\n* **Government Units**: For advanced trauma/cardiac transfer, call government service at **108**.',
    department: 'General Inquiry',
    tags: 'ambulance,emergency transport,108,pickup,critical',
  },
  {
    title: 'Patient Diet and Meals',
    content: 'Dietary and meal service information:\n* **Patient Meals**: Complimentary nutritious meals included in inpatient packages.\n* **Custom Diet**: Special menus (diabetic, liquid, low-sodium) are prepared based on doctor orders.\n* **Schedule**: Breakfast (8:00 AM), Lunch (12:30 PM), and Dinner (7:30 PM).\n* **Visitor Canteen**: A small canteen for attendants is available on the ground floor.',
    department: 'General Inquiry',
    tags: 'food,meals,diet,canteen,vegetarian,nutrition',
  },
  {
    title: 'Wi-Fi and Amenities',
    content: 'Amenities available for patients and attendants:\n* **Complimentary Wi-Fi**: Available in private and semi-private rooms.\n* **In-Room Features**: Air conditioning, flat-screen TV, attached washroom, nurse call buttons.\n* **Private Room Extras**: Dedicated attendant sofa-bed and storage lockers.\n* **Well-being Areas**: Prayer room and courtyard garden area.',
    department: 'General Inquiry',
    tags: 'wifi,internet,amenities,TV,AC,room facilities',
  },
  {
    title: 'About Demo Hospital',
    content: 'About Demo Hospital history and milestones:\n* **Established**: Founded in 2013 in Example City, Example State, by Dr. A. Example and Dr. A. Example.\n* **Capacity**: Expanded from a small clinic into a 50+ bed women\'s and multi-speciality hospital.\n* **Network**: Three core branches in Example City (Demo Hospital, Sun Srishti Speciality, Example Fertility Center).\n* **Track Record**: Successfully delivered over 25,000 babies over 12+ years of service.',
    department: 'General Inquiry',
    tags: 'about,history,founded,established,story,Dr Raj,Dr Selvi',
  },
  {
    title: 'Our Hospital Network',
    content: 'Demo Hospital healthcare network branches:\n* **Demo Hospital**: Focuses on Obstetrics, Gynecology, and Paediatrics.\n* **Sun Srishti Speciality**: Multi-speciality hospital for General Medicine, Surgery, and Orthopaedics.\n* **Example Fertility Center**: Specialized IVF & Reproductive Medicine facility.',
    department: 'General Inquiry',
    tags: 'network,branches,Sun Srishti,Example,institutions,hospitals',
  },
  {
    title: 'Feedback and Complaints',
    content: 'How to share feedback or register complaints:\n* **Online Form**: Go to the Feedback section (/feedback) on our website.\n* **Patient Relations**: Speak directly to the Patient Relations Officer at reception.\n* **Email**: Send queries to info@example.com.\n* **Hotline**: Call us at +00 00000 00000.\n\n*All complaints are audited and resolved within 48 hours.*',
    department: 'General Inquiry',
    tags: 'feedback,complaint,suggestion,review,experience,improve',
  },
  {
    title: 'Careers at Demo Hospital',
    content: 'Join our healthcare and administration team:\n* **Openings**: Current listings are updated on our Careers (/careers) page.\n* **Applications**: Click the apply button to submit via our LinkedIn jobs pipeline.\n* **Direct Mail**: Send resumes directly to info@example.com.\n* **Roles**: Open to doctors, nursing staff, technicians, and admin personnel.',
    department: 'General Inquiry',
    tags: 'career,job,hiring,vacancy,apply,recruitment,work',
  },
  {
    title: 'COVID-19 Safety Protocols',
    content: 'Our active infection prevention protocols:\n* **Entry Checks**: Mandatory hand sanitization and temperature checks at entrance.\n* **Mask Policy**: Mask wearing required in all inpatient and clinical zones.\n* **Sanitization**: Regular surface chemical disinfection of all counters and rooms.\n* **Isolation**: Separated isolation beds for suspected infectious patients.\n* **Restrictions**: Visitor limitations enforced based on health guidelines.',
    department: 'General Inquiry',
    tags: 'COVID,corona,safety,protocol,mask,sanitizer,infection control',
  },
  {
    title: 'General Surgery Services',
    content: 'Laparoscopic and general surgery procedures:\n* **Minimally Invasive**: Keyhole laparoscopic surgeries for Gallbladder, Appendix, and Hernia.\n* **General Procedures**: Thyroid removal, breast lump excision, and varicose vein therapy.\n* **Endoscopy**: Diagnostic upper and lower GI endoscopies.\n* **Leadership**: Directed by Dr. A. Example (MS, FMAS, DMAS) with 12+ years of surgical experience.',
    department: 'General Surgery',
    tags: 'surgery,laparoscopic,endoscopic,hernia,gallbladder,appendix,thyroid',
  },
];

async function seed(): Promise<void> {
  console.log('─── Starting database seed ───\n');

  const connection = await pool.getConnection();

  try {
    // Clean up existing data to ensure updates are applied
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    await connection.query('TRUNCATE TABLE faq_documents;');
    await connection.query('TRUNCATE TABLE departments;');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('  ✓ Cleaned up old FAQ and department records.');

    // ── Seed Admin User ──
    const [existing] = await connection.execute<any[]>(
      'SELECT id FROM admin_users WHERE email = ?',
      [DEFAULT_ADMIN.email],
    );

    if (existing.length > 0) {
      console.log(`  ⓘ Admin user "${DEFAULT_ADMIN.email}" already exists — skipping.`);
    } else {
      const passwordHash = await bcrypt.hash(DEFAULT_ADMIN.password, SALT_ROUNDS);
      await connection.execute(
        'INSERT INTO admin_users (name, email, password_hash) VALUES (?, ?, ?)',
        [DEFAULT_ADMIN.name, DEFAULT_ADMIN.email, passwordHash],
      );
      console.log(`  ✓ Admin user created:`);
      console.log(`    Email:    ${DEFAULT_ADMIN.email}`);
      console.log(`    Password: ${DEFAULT_ADMIN.password}`);
      console.log(`    ⚠ Change this password after first login!`);
    }

    // ── Seed Departments ──
    console.log('\n  Seeding departments...');
    for (const dept of DEPARTMENTS) {
      const [exists] = await connection.execute<any[]>(
        'SELECT id FROM departments WHERE name = ?',
        [dept.name],
      );
      if (exists.length === 0) {
        await connection.execute(
          'INSERT INTO departments (name, description) VALUES (?, ?)',
          [dept.name, dept.description],
        );
        console.log(`    ✓ Department: ${dept.name}`);
      } else {
        console.log(`    ⓘ Department "${dept.name}" exists — skipping`);
      }
    }

    // ── Seed FAQ Documents ──
    console.log('\n  Seeding FAQ knowledge base...');
    for (const faq of FAQ_ENTRIES) {
      const [exists] = await connection.execute<any[]>(
        'SELECT id FROM faq_documents WHERE title = ?',
        [faq.title],
      );
      if (exists.length === 0) {
        // Look up department ID
        let deptId: number | null = null;
        if (faq.department) {
          const [deptRows] = await connection.execute<any[]>(
            'SELECT id FROM departments WHERE name = ?',
            [faq.department],
          );
          if (deptRows.length > 0) {
            deptId = deptRows[0].id;
          }
        }

        await connection.execute(
          'INSERT INTO faq_documents (title, content, department_id, tags) VALUES (?, ?, ?, ?)',
          [faq.title, faq.content, deptId, faq.tags],
        );
        console.log(`    ✓ FAQ: ${faq.title}`);
      } else {
        console.log(`    ⓘ FAQ "${faq.title}" exists — skipping`);
      }
    }

    console.log('\n─── Seed completed successfully ───');
  } catch (err) {
    console.error('\n✗ Seed failed:', err);
    process.exit(1);
  } finally {
    connection.release();
    await pool.end();
  }
}

seed();
