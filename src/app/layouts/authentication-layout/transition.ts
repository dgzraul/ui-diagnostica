import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const slideAnimation =
	trigger('routeAnimations', [
		transition('Aplicacion => *', [
			query(':enter, :leave',
				style({
					position: 'fixed', width: '31.7%' /** Tamaño del contenedor del login antes de tomar su posición base */
				}),
				{ optional: true }),
			group([
				query(':enter', [ /** Entrada de login */
					style({ transform: 'translateX(-10%)', opacity: 0 }), /** Desde donde entra el login */
					animate('200ms ease-out',
						style({ transform: 'translateX(0%)', opacity: 0.8 })) /** Hasta donde llegará el login */
				], { optional: true }),

				query(':leave', [ /** Salida de registro */
					style({ transform: 'translateX(0%)', opacity: 0.5 }), /** Desde donde entra el registro */
					animate('100ms ease-out',
						style({ transform: 'translateX(10%)', opacity: 0 })
					) /** Hasta donde se oculta el registro */
				], { optional: true }),
			])
		]),
		transition('Login => *', [
			query(':enter, :leave',
				style({
					position: 'fixed', width: '31.7%'
				}),
				{ optional: true }),
			group([
				query(':enter', [
					style({ transform: 'translateX(10%)', opacity: 0 }),
					animate('200ms ease-out',
						style({ transform: 'translateX(0%)', opacity: 0.8 }))
				], { optional: true }),

				query(':leave', [
					style({ transform: 'translateX(0%)', opacity: 0.5 }),
					animate('100ms ease-out',
						style({ transform: 'translateX(-10%)', opacity: 0 }))
				], { optional: true }),
			])
		])
	]);
