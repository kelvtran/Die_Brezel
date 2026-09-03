<?php
    // autoload Composer dependencies
    require __DIR__ . '/vendor/autoload.php';
    // Load environment variables from .env file
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();


    if ($_SERVER['REQUEST_METHOD'] =='POST') {
        $topic = $_POST['topic'];
        $name= $_POST['name'];
        $senderEmail= $_POST['email'];
        $message= $_POST['email-content'];

        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['EMAIL']; // .env variables
        $mail->Password = $_ENV['EMAIL_PW']; 
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;


        // Set the sender, recipient, and reply-to addresses for the email
        $mail->setFrom($_ENV['EMAIL'], 'Die Brezel'); // Set the sender of the email to the user's email and name
        $mail->addAddress($_ENV['EMAIL']); // Our email
        $mail->addReplyTo($senderEmail, $name);
        $mail->Subject = $topic;
        $mail->Body = "Subject: $topic\nName: $name\nEmail: $senderEmail\n\nMessage:\n$message";

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
            die();
        } else {
            // Send confirmation message to the user
            // Comment this out if you dont think its necessary.
            $mail->clearAddresses();
            $mail->addAddress($senderEmail, $name);
            $mail->Subject = "Confirmation: $topic";
            $mail->Body = "Dear $name,\n\nThank you for contacting us. We will get back to you soon.\n\nYour message:\n$message";
            $mail->send();

            // Add confirmation message to the user

        }

    }
?>