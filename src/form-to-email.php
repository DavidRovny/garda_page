<?php
// Získání dat z formuláře a ošetření vstupů
$name = htmlspecialchars(trim($_POST['name']));
$email = htmlspecialchars(trim($_POST['email']));
$phone = htmlspecialchars(trim($_POST['phone']));
$message = htmlspecialchars(trim($_POST['message']));

// Kontrola, zda jsou povinná pole vyplněna
if (empty($name) || empty($email) || empty($message)) {
    echo "Prosím vyplňte všechna povinná pole.";
    exit;
}

// Ověření formátu e-mailu
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Neplatná e-mailová adresa.";
    exit;
}

// Prevence proti emailovým injekcím
function isInjected($str) {
    $injections = array('(\n+)', '(\r+)', '(\t+)', '(%0A+)', '(%0D+)', '(%08+)', '(%09+)');
    return preg_match("/" . join('|', $injections) . "/i", $str);
}

if (isInjected($email) || isInjected($name) || isInjected($message)) {
    echo "Neplatné znaky ve formuláři.";
    exit;
}

// Sestavení e-mailu
$to = "xxx@mail.com";  // Nahraďte svou e-mailovou adresou
$subject = "Nová zpráva z webového formuláře Jméno: $name Email: $email";
$body = "Obdrželi jste novou zprávu od uživatele:\n\n".
        "Jméno: $name\n".
        "Email: $email\n".
        "Telefon: $phone\n\n".
        "Zpráva:\n$message\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Odeslání e-mailu a zpracování výsledku
if (mail($to, $subject, $body, $headers)) {
    echo "<script>
            document.getElementById('popup-success').style.display = 'flex';
          </script>";
} else {
    echo "<script>
            document.getElementById('popup-error').style.display = 'flex';
          </script>";
}
?>