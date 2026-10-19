import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sender = {
  email: process.env.EMAIL_USER || "noreply@pingora.com",
  name: process.env.EMAIL_FROM_NAME || "Siddhant Patel",
};

export async function sendWelcomeEmail(email: string, name: string, clientURL: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Email credentials not configured, skipping welcome email");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Pingora!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #06b6d4;">Welcome to Pingora, ${name}!</h2>
          <p>We are thrilled to have you here. Pingora lets you connect with your friends in real time.</p>
          <div style="margin: 20px 0;">
            <a href="${clientURL}" style="background-color: #06b6d4; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Open Pingora
            </a>
          </div>
          <p style="color: #64748b; font-size: 13px;">Happy messaging!<br />The Pingora Team</p>
        </div>
      `,
    });
    console.log("Welcome email sent to:", email);
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Email credentials not configured, skipping password reset email");
    console.log("Password reset link:", resetLink);
    return;
  }
  try {
    await transporter.sendMail({
      from: `"${sender.name}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your Pingora password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; border-radius: 12px; color: #f8fafc;">
          <h2 style="color: #22d3ee; margin-top: 0;">Reset Your Password</h2>
          <p style="color: #cbd5e1; line-height: 1.6;">
            We received a request to reset your password for your Pingora account. Click the button below to choose a new password. This link is valid for 1 hour.
          </p>
          <div style="margin: 28px 0; text-align: center;">
            <a href="${resetLink}" style="background-color: #06b6d4; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);">
              Reset Password
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 13px; line-height: 1.5;">
            If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
          <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            If the button doesn't work, copy and paste this link into your browser:<br />
            <a href="${resetLink}" style="color: #38bdf8; word-break: break-all;">${resetLink}</a>
          </p>
        </div>
      `,
    });
    console.log("Password reset email sent to:", email);
  } catch (err) {
    console.error("Failed to send password reset email:", err);
  }
}
