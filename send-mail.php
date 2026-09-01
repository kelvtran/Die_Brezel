<?php
    // autoload Composer dependencies
    require __DIR__ . '/vendor/autoload.php';

    if ($_SERVER['REQUEST_METHOD'] =='POST') {
        $topic = $_POST['topic'];
        $name= $_POST['name'];
        $email= $_POST['email'];
        $message= $_POST['message'];

        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your_email@example.com';
        $mail->Password = 'your_password';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($email, $name);
        $mail->addAddress('recipient@example.com');
        $mail->Subject = $topic;
        $mail->Body = $message;

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            echo 'Message has been sent';
        }

    }
?>