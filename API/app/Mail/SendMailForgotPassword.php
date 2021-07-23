<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMailForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->email = $data['email'];
        $this->token = $data['token'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('Mail.send_mail_forgot_password', [
            'messages' => 'Clique no link abaixo para trocar a sua senha. Se você recebeu isso e não solicitou a troca de senha, ignore esse e-mail.',
            'link' => 'https://bee-web2.vercel.app/alterar-senha/'.$this->token])
                ->to($this->email)
                ->from('HacskBoy@hotmail.com')
                ->subject('Solicitação de troca de senha.');
    }
}
