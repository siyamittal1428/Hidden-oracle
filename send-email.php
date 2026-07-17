<?php
/**
 * send-email.php
 * Email API Gateway for Hidden Oracle using the Resend API
 */

// Headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Enforce POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// ----------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------
// You can define variables here, or set them as environment variables on your server.
$resend_api_key = getenv('RESEND_API_KEY') ?: 're_ZVWvzKYa_ETVfkNS5n7eFSL8yZiU6zibL';
$mail_from      = getenv('MAIL_FROM')      ?: 'onboarding@resend.dev';
$mail_to        = getenv('MAIL_TO')        ?: 'siyamittal1428@gmail.com';

// Verify API configuration
if (!$resend_api_key || $resend_api_key === 'your_resend_api_key_here') {
    http_response_code(500);
    echo json_encode(['error' => 'Email service is not configured. Please set RESEND_API_KEY.']);
    exit;
}

// ----------------------------------------------------
// PARSE AND VALIDATE INPUT
// ----------------------------------------------------
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

$kind         = isset($data['kind'])        ? trim($data['kind'])        : 'contact';
$name         = isset($data['name'])        ? trim($data['name'])        : '';
$email        = isset($data['email'])       ? trim($data['email'])       : '';
$phone        = isset($data['phone'])       ? trim($data['phone'])       : '';
$whatsapp     = isset($data['whatsapp'])    ? trim($data['whatsapp'])    : '';
$country      = isset($data['country'])     ? trim($data['country'])     : '';
$service      = isset($data['service'])     ? trim($data['service'])     : '';
$date         = isset($data['date'])        ? trim($data['date'])        : '';
$time         = isset($data['time'])        ? trim($data['time'])        : '';
$sessionType  = isset($data['sessionType']) ? trim($data['sessionType']) : '';
$message      = isset($data['message'])     ? trim($data['message'])     : '';

// Minimal validation
if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Full Name and Email are required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address format.']);
    exit;
}

// ----------------------------------------------------
// BUILD EMAIL HTML TEMPLATE
// ----------------------------------------------------
function escapeHtml($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

// Setup IST timestamp
date_default_timezone_set('Asia/Kolkata');
$timestamp = date('d/m/Y, h:i:s A') . ' IST';

$rows = [
    ["Full Name", $name],
    ["Email", $email],
    ["Phone Number", $phone ?: "—"],
    ["WhatsApp", $whatsapp ?: "—"],
    ["Country", $country ?: "—"],
    ["Selected Service", $service ?: "—"],
    ["Preferred Date", $date ?: "—"],
    ["Preferred Time", $time ?: "—"],
    ["Session Type", $sessionType ?: "—"],
    ["Message / Query", $message ?: "—"],
    ["Submitted At", $timestamp],
];

$rowsHtml = '';
foreach ($rows as $row) {
    $rowsHtml .= '
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;font-size:13px;color:#6b5f3b;font-weight:600;width:180px;">' . escapeHtml($row[0]) . '</td>
          <td style="padding:10px 14px;border-bottom:1px solid #eee;font-size:14px;color:#222;white-space:pre-wrap;">' . escapeHtml($row[1]) . '</td>
        </tr>';
}

$heading = $kind === 'booking' ? 'New Tarot Consultation Booking' : 'New Contact Message';
$subject = $kind === 'booking' ? "New Tarot Consultation Booking — {$name}" : "New Contact Message — {$name}";

$emailHtml = '
<!doctype html>
<html>
  <body style="margin:0;padding:32px 12px;background:#f6f1e7;font-family:Georgia,serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 6px 30px rgba(120,90,20,0.08);">
      <tr>
        <td style="background:linear-gradient(135deg,#3a1f5d,#7a5a24);padding:28px 30px;color:#fff;">
          <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#f4d9a0;">Hidden Oracle by Siya</div>
          <div style="font-size:24px;margin-top:6px;font-weight:600;">' . $heading . '</div>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 30px 8px;color:#3a2c10;font-size:14px;">
          A new ' . ($kind === 'booking' ? 'booking request' : 'message') . ' arrived via the website.
        </td>
      </tr>
      <tr>
        <td style="padding:8px 20px 24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eee;border-radius:12px;overflow:hidden;">
            ' . $rowsHtml . '
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 30px 26px;font-size:12px;color:#8a7a55;">
          Reply directly to ' . escapeHtml($email) . ' to respond to the client.
        </td>
      </tr>
    </table>
  </body>
</html>';

// ----------------------------------------------------
// SEND EMAIL VIA RESEND API
// ----------------------------------------------------
$toAddresses = array_map('trim', explode(',', $mail_to));

$postData = [
    'from'     => $mail_from,
    'to'       => $toAddresses,
    'reply_to' => $email,
    'subject'  => $subject,
    'html'     => $emailHtml
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $resend_api_key
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . $curlErr]);
    exit;
}

$resData = json_decode($response, true);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['ok' => true, 'id' => isset($resData['id']) ? $resData['id'] : '']);
} else {
    $errMsg = isset($resData['message']) ? $resData['message'] : 'Failed to send email';
    http_response_code($httpCode ?: 500);
    echo json_encode(['error' => 'Resend Error: ' . $errMsg]);
}
?>
