@component('mail::message')
<h1 style="text-align: center;">Compra finalizada</h1>
<hr />
<p style="text-align: center;">Número do pedido: {{$order->invoice}}</p>
@foreach ($products as $product)
@component('mail::panel')
<div style="display: flex; align-items:center; justify-content: space-between;">
<div style="display: flex;">
<img style="border-radius:100%" src="<?php echo 'data:' . $product->mime_type . ';base64,' . base64_encode($product->image); ?>" width="50px" height="50px" alt="Imagem do produto {{$product->name}}">
<div style="display:block; text-align:left; margin-left:0.8rem;">
<p style="padding:0px !important; margin: 0px!important">{{$product->name}}</p>
<p style="padding:0px !important; margin: 0px!important">Quantidade: {{$product->quantity_sended}}</p>
</div>
</div>
<div style="display: flex;">
<p style="padding:0px !important; margin: 0px!important">Valor: {{$product->value_sended}}</p>
</div>
</div>
@endcomponent
@endforeach
<h1 style="text-align: center;">Total da compra: R$ {{ $order->value_total }}</h1>
<p style="text-align: center;">Obrigado por comprar conosco.</p>
@endcomponent
