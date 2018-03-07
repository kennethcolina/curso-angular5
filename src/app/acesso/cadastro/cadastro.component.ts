import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Usuario } from '../usuario.model'
import { Autenticacao } from '../../autenticacao.service'

@Component({
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.pug',
	styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

	formulario: FormGroup = new FormGroup({
		'email': new FormControl(null),
		'nome_completo': new FormControl(null),
		'nome_usuario': new FormControl(null),
		'senha': new FormControl(null)
	})
	@Output() exibirPainel: EventEmitter<string> = new EventEmitter()

	constructor(private autenticacaoService: Autenticacao) { }

	ngOnInit() {
	}

	exibirPainelLogin() {
		this.exibirPainel.emit('login')
	}

	cadastrarUsuario() {
		console.log(this.formulario.value)

		let usuario: Usuario = new Usuario(
			this.formulario.value.email,
			this.formulario.value.nome_completo,
			this.formulario.value.nome_usuario,
			this.formulario.value.senha
		)

		this.autenticacaoService.cadastrarUsuario(usuario)
			.then(
				resposta => this.exibirPainelLogin(),
				erro => console.log(erro)
			)


	}

}
