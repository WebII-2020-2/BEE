<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderMail extends Mailable
{
    use Queueable, SerializesModels;

    private $order;
    private $products;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order, $products, $email)
    {
        $this->order = $order;
        $this->products = $products;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('Mail.order_mail', [
            'order' => $this->order,
            'products' => $this->products
        ])->to($this->email)
        ->from('HacskBoy@hotmail.com')
        ->subject('Compra finalizada.');
    }
}
