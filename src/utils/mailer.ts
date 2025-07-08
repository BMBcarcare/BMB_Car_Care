import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export const notifyAdminOnContact = async ({
  full_name,
  email,
  phone_number
}: {
  full_name: string
  email: string
  phone_number: string
}) => {
  const htmlContent = `
    <h2>📩 Có người vừa gửi liên hệ mới</h2>
    <ul>
      <li><strong>Họ tên:</strong> ${full_name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>SĐT:</strong> ${phone_number}</li>
    </ul>
    <p>Vui lòng kiểm tra trang quản lý liên hệ để xử lý.</p>
  `

  await transporter.sendMail({
    from: `"Hệ thống NhatPhat Auto" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER, // chính là bạn
    subject: '📬 Liên hệ mới từ khách hàng',
    html: htmlContent
  })
}
export const notifyAdminOnAppointment = async ({
  full_name,
  phone_number
}: {
  full_name: string
  phone_number: string
}) => {
  const htmlContent = `
    <h2>📩 Có người vừa gửi lịch hẹn mới</h2>
    <ul>
      <li><strong>Họ tên:</strong> ${full_name}</li>
      <li><strong>SĐT:</strong> ${phone_number}</li>
    </ul>
    <p>Vui lòng kiểm tra trang quản lý liên hệ để xử lý.</p>
  `

  await transporter.sendMail({
    from: `"Hệ thống NhatPhat Auto" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER, // chính là bạn
    subject: '📬 Khách Hàng Đặt Lịch',
    html: htmlContent
  })
}
