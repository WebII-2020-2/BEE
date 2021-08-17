@component('mail::message')
    <h1>Solicitação de troca de senha</h1>
    <h3>{{ $messages }}</h3>
    @component('mail::button', ['url' => $link])
        Trocar senha agora
    @endcomponent
@endcomponent
