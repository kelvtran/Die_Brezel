<?php
    // autoload Composer dependencies
    require __DIR__ . '/vendor/autoload.php';
    // Load environment variables from .env file
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();


    if ($_SERVER['REQUEST_METHOD'] =='POST') {
        $topic = $_POST['topic'];
        $name= $_POST['name'];
        $email= $_POST['email'];
        $message= $_POST['email-content'];

        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['EMAIL'];
        $mail->Password = $_ENV['EMAIL_PW'];
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($email, $name); // Set the sender of the email to the user's email and name
        $mail->addAddress($_ENV['EMAIL']); // Our email
        $mail->addReplyTo($email, $name);
        $mail->Subject = $topic;
        $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
            die();
        } else {
            echo 'Message has been sent';
        }

    }
?>