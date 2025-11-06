import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error: Error | null) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Send newsletter subscription confirmation email
export async function sendNewsletterConfirmation(email: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Surwahi Social Ecoestate" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to Surwahi Newsletter! 🌿',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #4A7C2C; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌿 Welcome to Surwahi!</h1>
            </div>
            <div class="content">
              <p>Dear Nature Enthusiast,</p>
              
              <p>Thank you for subscribing to the Surwahi Social Ecoestate Kanha newsletter! We're thrilled to have you join our community of eco-conscious travelers and nature lovers.</p>
              
              <p>You'll now receive updates about:</p>
              <ul>
                <li>🌳 Conservation efforts and sustainability programs</li>
                <li>🦋 Seasonal wildlife highlights and nature updates</li>
                <li>🏡 Exclusive eco-travel offers and experiences</li>
                <li>🌱 Community initiatives and local partnerships</li>
              </ul>
              
              <p>Ready to experience the forest? Plan your visit today!</p>
              
              <a href="https://surwahi.com/contact" class="button" style="color: white;">Plan Your Visit</a>
              
              <p>If you have any questions, feel free to reach out to us at contact@surwahi.com or call +91 77952 07779.</p>
              
              <p>With warm regards,<br>
              The Surwahi Team</p>
            </div>
            <div class="footer">
              <p>Surwahi Social Ecoestate Kanha<br>
              Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, MP - 481111</p>
              <p>© ${new Date().getFullYear()} Surwahi Social. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Surwahi Newsletter!

Thank you for subscribing to Surwahi Social Ecoestate Kanha newsletter!

You'll receive updates about conservation efforts, wildlife highlights, exclusive offers, and community initiatives.

Visit us at https://surwahi.com

Contact: contact@surwahi.com | +91 77952 07779

Surwahi Social Ecoestate Kanha
Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, MP - 481111
      `,
    });

    console.log('Newsletter confirmation sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    return { success: false, error };
  }
}

// Send contact form notification to sales team
export async function sendContactFormNotification(formData: {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  inquiryType?: string;
  preferredDates?: string;
  partySize?: number;
  message: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Surwahi Website" <${process.env.SMTP_USER}>`,
      to: process.env.SALES_EMAIL,
      replyTo: formData.email,
      subject: `New ${formData.inquiryType || 'Contact'} Inquiry - ${formData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2D5016; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2D5016; }
            .value { margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #4A7C2C; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🌿 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
              </div>
              
              ${formData.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
              </div>
              ` : ''}
              
              ${formData.city ? `
              <div class="field">
                <div class="label">City:</div>
                <div class="value">${formData.city}</div>
              </div>
              ` : ''}
              
              ${formData.inquiryType ? `
              <div class="field">
                <div class="label">Inquiry Type:</div>
                <div class="value">${formData.inquiryType}</div>
              </div>
              ` : ''}
              
              ${formData.preferredDates ? `
              <div class="field">
                <div class="label">Preferred Dates:</div>
                <div class="value">${formData.preferredDates}</div>
              </div>
              ` : ''}
              
              ${formData.partySize ? `
              <div class="field">
                <div class="label">Party Size:</div>
                <div class="value">${formData.partySize} guests</div>
              </div>
              ` : ''}
              
              <div class="message-box">
                <div class="label">Message:</div>
                <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.city ? `City: ${formData.city}` : ''}
${formData.inquiryType ? `Inquiry Type: ${formData.inquiryType}` : ''}
${formData.preferredDates ? `Preferred Dates: ${formData.preferredDates}` : ''}
${formData.partySize ? `Party Size: ${formData.partySize} guests` : ''}

Message:
${formData.message}

Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `,
    });

    console.log('Contact form notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact form notification:', error);
    return { success: false, error };
  }
}

// Send confirmation email to user who submitted contact form
export async function sendContactFormConfirmation(email: string, name: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Surwahi Social Ecoestate" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Surwahi! 🌿',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌿 Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for contacting Surwahi Social Ecoestate Kanha. We have received your inquiry and our team will get back to you within 24 hours.</p>
              
              <p>In the meantime, feel free to explore more about our eco-lodge and experiences on our website.</p>
              
              <p>For urgent matters, you can reach us directly:</p>
              <ul>
                <li>📞 Phone: <a href="tel:+917795207779">+91 77952 07779</a></li>
                <li>✉️ Email: <a href="mailto:contact@surwahi.com">contact@surwahi.com</a></li>
              </ul>
              
              <p>We look forward to helping you plan your forest retreat!</p>
              
              <p>With warm regards,<br>
              The Surwahi Team</p>
            </div>
            <div class="footer">
              <p>Surwahi Social Ecoestate Kanha<br>
              Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, MP - 481111</p>
              <p>© ${new Date().getFullYear()} Surwahi Social. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Thank you for contacting Surwahi!

Dear ${name},

Thank you for contacting Surwahi Social Ecoestate Kanha. We have received your inquiry and our team will get back to you within 24 hours.

For urgent matters:
Phone: +91 77952 07779
Email: contact@surwahi.com

We look forward to helping you plan your forest retreat!

With warm regards,
The Surwahi Team

Surwahi Social Ecoestate Kanha
Village Surwahi, P.O Majgaon, Tehsil Paraswada, District Balaghat, MP - 481111
      `,
    });

    console.log('Contact form confirmation sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending contact form confirmation:', error);
    return { success: false, error };
  }
}

export default transporter;
