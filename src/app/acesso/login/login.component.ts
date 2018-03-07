import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Autenticacao } from '../../autenticacao.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.pug',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	@Output() exibirPainel: EventEmitter<string> = new EventEmitter()

	formulario: FormGroup = new FormGroup({
		'email': new FormControl(null),
		'senha': new FormControl(null)
	})

	constructor(private autenticacao: Autenticacao) { }

	ngOnInit() {
	}

	exibirPainelCadastro() {
		this.exibirPainel.emit('cadastro')
	}

	autenticar() {
		this.autenticacao.autenticar(
			this.formulario.value.email,
			this.formulario.value.senha
		)
	}

}
