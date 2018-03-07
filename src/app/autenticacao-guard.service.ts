import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Autenticacao } from "./autenticacao.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate {

	constructor(private autenticacao: Autenticacao) {}

	canActivate(route, state): boolean {

		return this.autenticacao.autenticado();
	}
}