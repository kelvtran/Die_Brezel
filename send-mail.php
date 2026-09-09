<?php
    // autoload Composer dependencies
    require __DIR__ . '/vendor/autoload.php';
    // Load environment variables from .env file
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    if ($_SERVER['REQUEST_METHOD'] =='POST') {

        // Set JSON response header
        header('Content-Type: application/json');

        // Get form data variables
        $topic = $_POST['topic'];
        $name= $_POST['name'];
        $senderEmail= $_POST['email'];
        $message= $_POST['email-content'];

        // Validate required fields
        if (empty($topic) || empty($name) || empty($senderEmail) || empty($message)) {
            echo json_encode([
                'success' => false,
                'message' => 'Please fill in all required fields.'
            ]);
            exit;
        }

        // Validate email
        if (!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                'success' => false,
                'message' => 'Please enter a valid email address.'
            ]);
            exit;
        }

        // Construct the email message
        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['EMAIL']; // .env variables
        $mail->Password = $_ENV['EMAIL_PW']; 
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        
        try {
            // Set the sender, recipient, and reply-to addresses for the email
            $mail->setFrom($_ENV['EMAIL'], 'Die Brezel'); // Set the sender of the email to the user's email and name
            $mail->addAddress($_ENV['EMAIL']); // Our email
            $mail->addReplyTo($senderEmail, $name);
            $mail->Subject = $topic;
            $mail->Body = "Subject: $topic\nName: $name\nEmail: $senderEmail\n\nMessage:\n$message";
            $mail->send();
        
            // Send confirmation to user
            $mail->clearAddresses();
            $mail->addAddress($senderEmail, $name);
            $mail->Subject = "Confirmation: $topic";
            $mail->Body = "Dear $name,\n\nThank you for contacting Die Brezel. We will get back to you soon.\n\nYour message:\n$message";
            $mail->send();
        
            // Return success response
            echo json_encode([
                'success' => true,
                'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.'
            ]);
        
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Message could not be sent. Error: ' . $mail->ErrorInfo
            ]);
        }
        exit;
    
    }
?>