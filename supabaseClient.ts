// ----------------------------
// ✅ ZenTech Innovators Supabase Integration
// ----------------------------

import { createClient } from '@supabase/supabase-js';
import type { CertificateDetails, Applicant, PaymentDetails, Intern } from './types';

// ----------------------------
// 🔗 Step 1: Initialize Supabase Client
// ----------------------------

const supabaseUrl = 'https://sinzgtwgckcffeurujed.supabase.co'; // your Supabase project URL
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpbnpndHdnY2tjZmZldXJ1amVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDA5OTksImV4cCI6MjA3ODAxNjk5OX0.wQb9M43-5Ai9T4h4ByamptJjzgw2xcGUfh4vLqJFXSk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----------------------------
// 🎓 Step 2: Certificate Fetcher
// ----------------------------

export const fetchCertificateFromSupabase = async (
  certificateId: string
): Promise<CertificateDetails | null> => {
  const certId = certificateId.trim().toUpperCase();

  const { data, error } = await supabase
    .from('certificates')
    .select('student_name, domain, issue_date, pdf_link')
    .eq('id', certId)
    .single();

  if (error) {
    // Expected: "Not found" or missing row
    if (error.code !== 'PGRST116') {
      console.error('Error fetching certificate:', error.message);
      throw error;
    }
    return null;
  }

  if (!data) return null;

  const certificate: CertificateDetails = {
    studentName: data.student_name,
    domain: data.domain,
    issueDate: data.issue_date,
    pdfLink: data.pdf_link,
  };

  return certificate;
};

// ----------------------------
// 🧾 Step 3: Application Submission (Internship Form)
// ----------------------------

export const saveApplicationToSupabase = async (
  applicant: Applicant
): Promise<{ data: any | null; error: any | null }> => {
  console.log('Saving application to Supabase:', applicant);

  const { data, error } = await supabase
    .from('applications')
    .insert([
      {
        name: applicant.name,
        email: applicant.email,
        // The 'phone' column does not exist in the 'applications' table, causing the error.
        // phone: applicant.phone, 
        // FIX: Append phone number to program_name to preserve data without causing an error.
        program_name: `${applicant.programName} (Phone: ${applicant.phone})`,
        status: 'pending', // Auto set new applicants as pending
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving application:', error.message);
    if (error.message.includes('Failed to fetch')) {
      console.error(
        'Supabase fetch error: Check your Supabase URL, API key, or network connection. Also ensure CORS settings allow your domain.'
      );
    }
  }

  return { data, error };
};

// ----------------------------
// 💳 Step 4: Payment Logging (Razorpay / RuPay Integration)
// ----------------------------

export const savePaymentDetails = async (
  details: PaymentDetails
): Promise<{ success: boolean; error?: any }> => {
  console.log('Saving payment details to Supabase:', details);

  const { error } = await supabase.from('payments').insert([
    {
      application_id: details.applicationId,
      intern_id: details.internId,
      payment_id: details.paymentId,
      order_id: details.orderId,
      signature: details.signature,
      amount: details.amount,
      status: details.status,
      method: details.method || 'Razorpay',
    },
  ]);

  if (error) {
    console.error('Error saving payment details:', error.message);
    if (error.message.includes('Failed to fetch')) {
      console.error(
        'Supabase fetch error: Verify Supabase credentials and enable CORS for your domain in project settings.'
      );
    }
    return { success: false, error };
  }

  return { success: true };
};

// ----------------------------
// 🧑‍💻 Step 5: Fetch All Interns (Admin Dashboard)
// ----------------------------

export const fetchAllInterns = async (): Promise<Intern[]> => {
  const { data, error } = await supabase.from('interns').select('*');

  if (error) {
    console.error('Error fetching interns:', error.message);
    if (error.message.includes('Failed to fetch')) {
      console.error(
        'Supabase fetch error: Likely CORS issue or incorrect project URL/key.'
      );
    }
    throw error;
  }

  return data || [];
};

// ----------------------------
// ✅ End of Supabase Client File
// ----------------------------
export async function testSupabaseConnection() {
  const { data, error } = await supabase.from('interns').select('*').limit(1);
  
  if (error) {
    console.error('❌ Supabase connection failed:', error.message);
    alert('Supabase connection failed. Check console for details.');
  } else {
    console.log('✅ Supabase connected successfully:', data);
    alert('Supabase connection is working!');
  }
}
