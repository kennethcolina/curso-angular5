import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Imagem } from './imagem.model'
@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.pug',
	styleUrls: ['./banner.component.scss'],
	animations: [
		trigger('banner', [
			state('escondido', style({
				opacity: 0
			})),
			state('visivel', style({
				opacity: 1
			})),
			transition('escondido <=> visivel', animate('1s ease-in'))
		])
	]
})
export class BannerComponent implements OnInit {

	estado: string = 'visivel'
	imagens: Imagem[] = [
		{ estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
		{ estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
		{ estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
		{ estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
		{ estado: 'escondido', url: '/assets/banner-acesso/img_5.png' },
	]

	constructor() { }

	ngOnInit() {
		setTimeout(() => this.logicaRotacao(), 2000)
	}

	logicaRotacao() {

		let idx: number = 0

		for(let i: number = 0; i < 5; i++) {

			if(this.imagens[i].estado === 'visivel') {
				this.imagens[i].estado = 'escondido'
				idx = i === 4 ? 0 : i + 1
				break
			}

		}

		this.imagens[idx].estado = 'visivel'

		setTimeout(() => this.logicaRotacao(), 2000)
	}

}
