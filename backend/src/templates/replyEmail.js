exports.replyEmailHTML = ({ name, reply, reason }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reply from Sadiq Baba Idris</title>
</head>
<body style="margin:0;padding:0;background-color:#0C0C0C;font-family:'Inter',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0C0C;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#0C0C0C;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);">

          <!-- Hero -->
          <tr>
            <td style="background:linear-gradient(135deg,#18011F 0%,#B600A8 40%,#7621B0 70%,#BE4C00 100%);padding:48px 40px 36px;text-align:center;">
              <h1 style="margin:0;color:#D7E2EA;font-size:28px;font-weight:700;letter-spacing:-0.5px;">Sadiq Baba Idris</h1>
              <p style="margin:8px 0 0;color:rgba(215,226,234,0.7);font-size:15px;font-weight:400;">Full Stack Developer &amp; Creative Technologist</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;color:#D7E2EA;font-size:16px;font-weight:600;">Hi there,</p>
              <p style="margin:0 0 24px;color:rgba(215,226,234,0.7);font-size:15px;line-height:1.6;">
                Thank you for reaching out regarding <strong style="color:#D7E2EA;">${reason || 'your inquiry'}</strong>.
                Here is my response:
              </p>

              <!-- Reply Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.05);border-radius:12px;border-left:4px solid #B600A8;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;color:rgba(215,226,234,0.85);font-size:15px;line-height:1.7;white-space:pre-wrap;">${reply}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;color:rgba(215,226,234,0.7);font-size:15px;line-height:1.6;">Best regards,</p>
              <p style="margin:0 0 28px;color:#D7E2EA;font-size:16px;font-weight:600;">Sadiq Baba Idris</p>

              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0 0 24px;" />

              <p style="margin:0 0 6px;color:rgba(215,226,234,0.4);font-size:13px;">Need to continue the conversation?</p>
              <p style="margin:0;color:rgba(215,226,234,0.4);font-size:13px;">
                Reply to this email or reach me on WhatsApp:
                <a href="https://wa.me/2348027999992" style="color:#B600A8;text-decoration:none;">+234 802 799 9992</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.03);padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0 0 12px;color:rgba(215,226,234,0.35);font-size:12px;">
                &copy; ${new Date().getFullYear()} Sadiq Baba Idris &bull; All rights reserved.
              </p>
              <p style="margin:0;color:rgba(215,226,234,0.35);font-size:12px;">
                <a href="https://github.com/Sirdeeq" style="color:rgba(215,226,234,0.5);text-decoration:none;margin:0 8px;">GitHub</a>
                &bull;
                <a href="https://www.linkedin.com/in/sadiq-idris-baba-26683822b/" style="color:rgba(215,226,234,0.5);text-decoration:none;margin:0 8px;">LinkedIn</a>
                &bull;
                <a href="https://x.com/sirdurx" style="color:rgba(215,226,234,0.5);text-decoration:none;margin:0 8px;">X (Twitter)</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
