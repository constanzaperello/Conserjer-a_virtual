// Pantallas del prototipo Figma (frame -> clave). Coordenadas visuales en un lienzo de 1366x1024.
const P = (x, y, w, h, l, to, o = {}) => ({ k: 'pill', x, y, w, h, l, to, f: 'i', a: 0.2, r: 60, ...o })
const T = (x, y, w, t, c = 'ti', h = 159) => ({ k: 't', x, y, w, h, t, c })
const list = (x, ys, it) => it.map(([l, to], i) => P(x, ys[i], 1023, 100, l, to, { f: 'j', a: 0.36, r: 98 }))
const grid = (xs, ys, w, h, rows, to) =>
  rows.flatMap((row, i) => row.map((l, j) => P(xs[j], ys[i], w, h, l, to, { f: 'j', a: 0.36, r: 98 })))
const yn = (q, si, no, y = 609, dx = 0, qy = 398, qx = 320, qw = 726) => [
  T(qx, qy, qw, q, 'ti', 51), P(246 + dx, y, 381, 108, 'Si', si), P(733 + dx, y, 385, 109, 'No', no)]
const back = (to, y = 609) => P(490, y, 385, 109, 'Volver', to)
const note = (head, body, to, y) => [T(177, 150, 1023, head, 'hd', 205), T(177, y - 333 + 0, 1023, body, 'bd', 205), back(to, y)]
const Y5 = [297, 415, 533, 651, 769], Y4 = [354, 472, 590, 708], XS = [142, 421, 700, 979]
const HORAS = [['08:00','05:00','16:00','07:00'],['11:00','00:00','14:00','18:00'],['17:00','09:00','21:00','03:00'],
  ['01:00','23:00','02:00','22:00'],['19:00','04:00','10:00','12:00'],['06:00','13:00','20:00','15:00']]
const timeGrid = (title, to) => [T(177, 93, 1023, title),
  ...HORAS.flatMap((r, i) => r.map((l, j) => P(XS[j], [287, 386, 486, 585, 684, 784][i], 246, 82, l, to, { f: 'j', a: 0.36, r: 98 })))]
const MESES = [['agosto','mayo','septiembre','febrero'],['abril','enero','diciembre','julio'],['noviembre','junio','marzo','octubre']]
const hl = (next) => ['Año', 'Mes', 'Dia', 'Hora'].map((l, i) =>
  P(143, Y4[i], 1023, 100, l, i === next ? ['años', 'meses', 'dias', 'horas'][i] : null, { f: 'j', a: 0.36, r: 98 }))
const hlScreen = (n) => ({ items: [T(177, 93, 1023, 'Seleccion de horario.'), ...hl(n)].map((x) => x) })
const keypad = (q, qx, qy, qw, fy, to) => [T(qx, qy, qw, q, 'ti', 51), { k: 'kp', fy, to }]
const ayuda = (to4) => [P(201, 336, 381, 108, '¿Cómo usar este panel?', 'aComo'), P(201, 614, 381, 108, 'Algo no funciona', 'aFalla'),
  P(788, 336, 381, 108, 'No encuentro mi opciÓn', 'aNo'), P(788, 614, 381, 108, 'Volver', to4)]

export const screens = {
  welcome: { bg: 'w', items: [{ k: 'welcome' }], help: 'ayuda' },
  opciones: { help: 'error', items: [
    P(216, 294, 444, 126, 'Visita', 'visita'), P(705, 294, 444, 126, 'Paquete', 'paquete'),
    P(216, 449, 444, 126, 'Espacios comunes', 'espAreas'), P(705, 449, 444, 126, 'Reclamo', 'reclCat'),
    P(216, 604, 444, 126, 'Gastos comunes', 'gcAnios'), P(705, 604, 444, 126, 'Estacionamientos', 'estAccion')] },
  visita: { help: 'ayuda', items: [P(156, 423, 467, 177, 'Anunciar una visita', 'anunciar'), P(743, 423, 467, 177, 'Visita no registrada', 'noReg')] },
  anunciar: { help: 'ayuda', items: yn('¿Su visita ya llegó?', 'anunciar2', 'noReg') },
  anunciar2: { help: 'ayuda', items: yn('¿Su visita ya llegó?', 'cv', 'noReg') },
  noReg: { help: 'ayuda', items: [T(422, 398, 522, 'Para anunciar una visita debe registrarla', 'ti', 51), P(467, 609, 431, 109, 'Registrar visita', 'visita')] },
  cv: { help: 'ayuda', items: keypad('Ingrese el código de visita', 394, 174, 578, 354, 'codInv') },
  codInv: { help: 'ayuda', items: [T(426, 237, 514, 'Código no válido', 'hd', 51), T(472, 333, 398, 'Visita no registrada', 'bd', 51),
    ...yn('¿Desea registrar su visita?', 'anunciar', 'error', 651, 1, 512, 411, 545)] },
  error: { help: null, bg: 'e', items: [T(426, 400, 514, 'Erro r', 'er', 186), { k: 'hit', x: 727, y: 650, w: 158, h: 177, to: 'noEntHoy' },
    { k: 'hit', x: 755, y: 738, w: 343, h: 174, to: null }] },
  paquete: { help: 'ayuda', items: [P(156, 284, 467, 177, 'Retirar paquete', 'retirar'), P(156, 562, 467, 177, 'Paquete no recibido', 'reclCat'),
    P(743, 284, 467, 177, 'Dejar paquete', 'dejarDest'), P(743, 562, 467, 177, 'Paquete dañado', 'reclCat')] },
  retirar: { help: 'ayuda', items: yn('¿Tiene número de seguimiento?', 'cp', 'nop1') },
  cp: { help: 'ayuda', items: keypad('Ingrese el número del paquete', 372, 180, 623, 366, 'noEnc') },
  noEnc: { help: 'ayuda', items: [T(279, 296, 807, 'No encontrado', 'bg', 89), ...yn('Su paquete fue entregado hoy?', 'cp', 'noEntHoy', 672, 0, 505, 266, 834)] },
  noEntHoy: { help: 'ayuda', items: [T(320, 398, 726, 'Los paquetes no se almacenan por más de 24 h', 'ti', 51), back('paquete')] },
  nop1: { help: 'ayuda2', items: [T(320, 398, 726, 'Búsquelo en su correo', 'ti', 51), back('nop2')] },
  nop2: { help: 'ayuda', items: [T(320, 398, 726, 'Búsquelo en su correo', 'ti', 51), back('nop3')] },
  nop3: { help: 'ayuda', items: [T(320, 398, 726, 'Búsquelo en su correo', 'ti', 51), back('retirar')] },
  reclCat: { help: 'ayuda2', items: [T(177, 93, 1023, 'Seleccione la categoría específica que mejor se adapte a su requerimiento.'),
    ...list(177, Y5, [['Gastos Comunes y Cobros'], ['Convivencia y Ruidos'], ['Multas y Sanciones'], ['Instalaciones y Daños'], ['Seguridad y Accesos']].map(([l]) => [l, 'reclDeriv']))] },
  reclDeriv: { help: 'ayuda2', items: [T(177, 93, 1023, 'Derivación de área específica.'), ...list(177, Y5, [['Secretaría de Administración'], ['Jefatura de Operaciones'],
    ['Comité de Ética y Convivencia'], ['Atención al Copropietario (Torre A)'], ['Atención al Copropietario (Torre B)']].map(([l]) => [l, 'reclFmt']))] },
  reclFmt: { help: 'ayuda2', items: [T(177, 93, 1023, 'Seleccione el formato de registro legal.'), ...list(177, Y5, [['Formulario Simple Tipo B'], ['Alegación Jurídica Vinculante'],
    ['Requerimiento con Notificación'], ['Apelación de Multa con Evidencia'], ['Registro de Descargo Ordinario']].map(([l]) => [l, 'reclAt']))] },
  reclAt: { help: 'error', items: note('ATENCIÓN:', 'El sistema central registra que su torre posee un proceso administrativo pendiente. Por normativa interna, este tótem no recibe reclamos de esta categoría.', 'reclCat', 640) },
  dejarDest: { help: 'ayuda2', items: [T(177, 93, 1023, 'Seleccione la destinación interna del paquete.'), ...list(177, Y5, ['Casillero Inteligente Torre A', 'Casillero Inteligente Torre B', 'Depósito Central de Encomiendas', 'Bodega de Tránsito', 'Recepción Provisoria Subterráneo'].map((l) => [l, null]))] },
  dejarVol: { help: 'ayuda2', items: [T(177, 93, 1023, 'Seleccion de rango volumétrico de la encomienda'), ...list(177, Y5, ['Sobre / Documento (Hasta 100grs)', 'Caja Pequeña Estándar (15x15cm)', 'Caja Mediana Estándar (30x30cm)', 'Caja Grande Estándar (45x45cm)', 'Formato No Declarado'].map((l) => [l, null]))] },
  dejarRestr: { help: 'error', items: note('Restricción Operativa:', 'El registro de ingresos de paquetes externos se encuentra suspendido temporalmente por saturación del casillero automático. Por favor, contacte directamente al residente o intente en horario hábil', 'opciones', 640) },
  espAreas: { help: 'error', items: [T(171, 93, 1023, 'Seleccione el área específica sobre la cual desea realizar una gestión:'),
    ...[['Gimnasio', 188, 661], ['Piscina Exterior', 188, 506], ['Quincho  N° 1', 188, 350], ['Sala de Juegos', 677, 661], ['Sala de Eventos', 677, 506], ['Quincho  N° 2', 677, 350]]
      .map(([l, x, y]) => P(x, y, 444, 126, l, 'espCat', { f: 'j' }))] },
  espCat: { help: 'error', items: [T(177, 93, 1023, 'Seleccione la categoría específica que mejor se adapte a su requerimiento.'),
    ...list(177, Y4, [['Reservar fecha futura', 'hl0'], ['Modificar reserva existente', 'hl0'], ['Cancelar bloque horario', 'espProp'], ['Reportar incidencia o daño en el espacio', 'espProp']])] },
  espProp: { help: 'error', items: [T(177, 313, 1023, 'Módulo exclusivo para propietarios del dia.'), back('welcome')] },
  hl0: { help: 'error', ...hlScreen(0) }, hl1: { help: 'error', ...hlScreen(1) }, hl2: { help: 'error', ...hlScreen(2) }, hl3: { help: 'error', ...hlScreen(3) },
  años: { help: 'error', items: [T(177, 93, 1023, 'Seleccion de horario.'), ...grid(XS, [292, 412, 532, 652, 772], 246, 100,
    [[2028, 2037, 2020, 2033], [2034, 2023, 2040, 2027], [2021, 2026, 2031, 2039], [2036, 2032, 2035, 2022], [2030, 2024, 2029, 2038]], 'hl1')] },
  meses: { help: 'error', items: [T(177, 93, 1023, 'Seleccion de horario.'), ...grid(XS, [353, 494, 635], 246, 117, MESES, 'hl2')] },
  dias: { help: 'error', items: [T(177, 93, 1023, 'Seleccion de horario.'), ...grid([136, 322, 508, 695, 881, 1067], [278, 398, 518, 638, 758], 164, 100,
    [[4, 20, 23, 14, 2, 17], [18, 11, 28, 8, 30, 10], [13, 25, 1, 16, 21, 7], [5, 29, 22, 26, 3, 27], [24, 15, 6, 19, 9, 12]], 'hl3')] },
  horas: { help: 'error', items: timeGrid('Seleccion de horario.', 'noHor') },
  noHor: { help: 'error', items: [T(177, 313, 1023, 'Horario no disponible.'), back('hl0')] },
  estAccion: { help: 'error', items: [T(0, 128, 1366, 'Seleccione la acción correspondiente al espacio vehicular:'),
    ...list(177, Y4, [['Registro temporal de vehículo de visita', 'hl0'], ['Reportar vehículo mal estacionado / bloqueando', 'estSector'],
      ['Liberación de zona de carga y descarga', 'estSector'], ['Consulta de multas por pernoctación indebida', 'estSector']])] },
  estSector: { help: 'error', items: [T(0, 128, 1366, 'Indique el sector del recinto donde se registra la incidencia:'),
    ...list(177, Y4, ['Subterráneo -1', 'Superficie Exterior / Visitas Torre A', 'Superficie Exterior / Visitas Torre B', 'Estacionamientos de servicio'].map((l) => [l, 'estHora']))] },
  estHora: { help: 'error', items: timeGrid('Horario:', 'estAt') },
  estAt: { help: 'error', items: note('ATENCIÓN:', 'Camaras / personal no disponibles.', 'estAccion', 640) },
  gcAnios: { help: 'error', items: [T(177, 93, 1023, 'Seleccionar periodo de consulta.'), ...grid(XS, [346, 466, 586, 706], 246, 100,
    [[2017, 2023, 2015, 2018], [2021, 2026, 2013, 2025], [2023, 2014, 2019, 2022], [2020, 2024, 2022, 2016]], 'gcMeses')] },
  gcMeses: { help: 'error', items: [T(177, 93, 1023, 'Seleccionar periodo de consulta.'), ...grid(XS, [353, 494, 635], 246, 117, MESES, 'gcCheck')] },
  gcCheck: { help: 'error', items: [T(102, 128, 1148, 'Marque los conceptos específicos que desea auditar en el periodo seleccionado (selección multiple):'),
    ...['Consumo de agua caliente', 'Cobraranza de multas', 'Reparaciones', 'Espacios comunes'].map((l, i) => ({ k: 'cb', x: 177, y: [372, 493, 615, 736][i], l })),
    P(920, 709, 246, 117, 'Siguiente', 'gcErr', { f: 'j', a: 0.36, r: 98 })] },
  gcErr: { help: 'error', items: note('Erròr', 'El tótem no puede procesar su selección porque el servidor central está esperando la actualización de la carpeta tributaria del edificio. Por seguridad, su solicitud ha sido descartada y deberá reintentar el proceso completo el próximo mes.', 'opciones', 681) },
  ayuda: { help: null, items: ayuda('ayudaV') }, ayudaV: { help: null, items: ayuda('error') },
  aComo: { help: null, items: [T(320, 431, 726, 'Seleccione una opción en pA ntalla', 'ti', 51), P(217, 319, 381, 108, '¿Cómo usar este panel?', null), P(217, 597, 381, 108, 'Algo no funciona', null),
    P(804, 319, 381, 108, 'No encuentro mi opciÓn', null), P(509, 579, 381, 108, 'Volver', 'ayuda')] },
  aFalla: { help: null, items: [T(320, 431, 726, 'Int e nte  nuevamente', 'ti', 51), P(509, 579, 381, 108, 'Volver', 'aComo')] },
  aNo: { help: null, items: [P(216, 475, 381, 108, 'Otro', 'aOtro'), P(746, 463, 381, 108, 'Reclamo', 'aRecl')] },
  aOtro: { help: null, items: [T(279, 491, 726, 'Int e nte  nuevamente', 'ti', 51), P(599, 527, 381, 108, 'Volver', 'aNo')] },
  aRecl: { help: null, items: [P(509, 475, 381, 108, 'Atención presencial', 'aPres')] },
  aPres: { help: null, items: [T(320, 312, 726, 'Lunes a viernes, 9:00 a 9:30. Oficina de administración, piso -1.', 'ti', 51),
    T(380, 733, 606, 'Tiempo de espera estimado: no disponible.', 'ti', 51), P(509, 834, 381, 108, 'Volver', 'ayuda')] },
}
// Destino del botón "?" (65:… en Figma): 'ayuda' (frame Ayuda), 'error' (frame Error) o 'anunciar' (22:72)
export const helpTarget = { ayuda: 'ayuda', ayuda2: 'anunciar', error: 'error' }
