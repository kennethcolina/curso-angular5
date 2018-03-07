import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.pug',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private autenticacao: Autenticacao) { }

	ngOnInit() {
	}

	sair() {
		this.autenticacao.logout()

	}
}
