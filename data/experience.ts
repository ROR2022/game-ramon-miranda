export type Character = {
  name: string
  alias: string
  role: string
  description: string
  quote: string
  color: string
  portrait: string
  stats: { label: string; value: string }[]
}

export type Zone = {
  code: string
  name: string
  description: string
  coordinates: string
  imagePosition: string
  color: string
  image: string
}

export type Adventure = {
  number: string
  title: string
  location: string
  status: string
  date: string
  duration: string
  description: string
  imagePosition: string
  image: string
  featured?: boolean
}

export const experience = {
  brand: 'RAMON / MIRANDA',
  subtitle: 'THE SIBLING STORY',
  tagline: 'Dos hermanos. Una ciudad. Ningún día normal.',
  heroImage: '/images/ramon-miranda/key-art.png',
  finalMobileImage: '/images/ramon-miranda/final-mobile.png',
  radioName: 'RM RADIO 98.4',
  radioTrack: '/audio/music.mp3',
  characters: [
    {
      name: 'RAMON',
      alias: 'THE LONG WAY',
      role: 'El que siempre encuentra otra ruta',
      description: 'Impulsivo, leal y convencido de que cualquier problema puede resolverse con una buena idea y el tanque lleno.',
      quote: '“Si vamos a perdernos, que valga la pena.”',
      color: '#f47b45',
      portrait: '/images/ramon-miranda/ramon.png',
      stats: [{ label: 'LOYALTY', value: '98' }, { label: 'ROAD SENSE', value: '87' }, { label: 'GOOD TIMES', value: '100' }],
    },
    {
      name: 'MIRANDA',
      alias: 'SHE KNOWS THE WAY',
      role: 'La que siempre sabe dónde mirar',
      description: 'Observadora, creativa y capaz de convertir una salida normal en la aventura más inesperada del verano.',
      quote: '“El plan era otro. Esto está mucho mejor.”',
      color: '#d67ab9',
      portrait: '/images/ramon-miranda/miranda.png',
      stats: [{ label: 'INSTINCT', value: '96' }, { label: 'CHAOS LEVEL', value: '72' }, { label: 'GOOD TIMES', value: '100' }],
    },
  ] satisfies Character[],
  zones: [
    { code: '01 / COAST', name: 'OCEAN DRIVE', description: 'Donde todos los atardeceres parecen una escena final.', coordinates: '25°46′ N · 80°08′ W', imagePosition: 'center 57%', color: '#ffc857', image: '/images/ramon-miranda/key-art.png' },
    { code: '02 / CITY', name: 'DOWNTOWN', description: 'Edificios altos, luces encendidas y planes que cambian rápido.', coordinates: '25°47′ N · 80°11′ W', imagePosition: 'center 48%', color: '#62d8dc', image: '/images/ramon-miranda/downtown.png' },
    { code: '03 / GREEN', name: 'PALM DISTRICT', description: 'Una caminata puede convertirse en una aventura.', coordinates: '25°49′ N · 80°13′ W', imagePosition: 'center 50%', color: '#ed5b78', image: '/images/ramon-miranda/palm-district.png' },
    { code: '04 / AFTER DARK', name: 'NIGHT MARKET', description: 'Música, comida, neón y demasiadas buenas ideas.', coordinates: '25°45′ N · 80°10′ W', imagePosition: 'center 58%', color: '#7654d9', image: '/images/ramon-miranda/night-market.png' },
    { code: '05 / OPEN ROAD', name: 'COASTAL HIGHWAY', description: 'El camino largo casi siempre es el mejor.', coordinates: '25°43′ N · 80°06′ W', imagePosition: 'center 67%', color: '#f47b45', image: '/images/ramon-miranda/coastal-highway.png' },
    { code: '06 / LOOKOUT', name: 'MIRADOR POINT', description: 'El lugar para recordar todo lo que ya vivimos.', coordinates: '25°51′ N · 80°04′ W', imagePosition: 'center 32%', color: '#f09bd3', image: '/images/ramon-miranda/key-art.png' },
  ] satisfies Zone[],
  adventures: [
    { number: '01', title: 'LA RUTA DEL ATARDECER', location: 'Coastal Highway', status: 'COMPLETADA', date: 'JUN 14, 2026', duration: '2H 18M', description: 'El camino era más largo, pero la vista valía cada kilómetro.', imagePosition: 'center 70%', image: '/images/ramon-miranda/coastal-highway.png', featured: true },
    { number: '02', title: 'UNA NOCHE EN DOWNTOWN', location: 'Downtown', status: 'COMPLETADA', date: 'JUN 21, 2026', duration: '4H 02M', description: 'Entramos por una razón y terminamos celebrando otra.', imagePosition: 'center 48%', image: '/images/ramon-miranda/downtown.png' },
    { number: '03', title: 'EL PLAN QUE CAMBIÓ', location: 'Palm District', status: 'ARCHIVADA', date: 'JUL 02, 2026', duration: '3H 45M', description: 'Nada salió como esperábamos. Todo salió mejor.', imagePosition: 'center 50%', image: '/images/ramon-miranda/palm-district.png' },
    { number: '04', title: 'MIRADOR POINT', location: 'North Ridge', status: 'FAVORITA', date: 'JUL 18, 2026', duration: '1H 32M', description: 'Algunas vistas se quedan contigo mucho después de volver a casa.', imagePosition: 'center 32%', image: '/images/ramon-miranda/key-art.png' },
    { number: '05', title: 'NIGHT MARKET', location: 'Old Harbor', status: 'EN LA MEMORIA', date: 'AUG 05, 2026', duration: '5H 11M', description: 'Una noche, demasiadas luces y una historia para repetir.', imagePosition: 'center 58%', image: '/images/ramon-miranda/night-market.png' },
    { number: '06', title: 'EL PRÓXIMO CAMINO', location: 'Unknown', status: 'PRÓXIMAMENTE', date: 'POR ESCRIBIR', duration: '—', description: 'La siguiente aventura todavía no tiene fecha.', imagePosition: 'center 67%', image: '/images/ramon-miranda/coastal-highway.png' },
  ] satisfies Adventure[],
  socialPosts: [
    { username: '@miranda.afterdark', location: 'Ocean Drive', time: '22:48', text: 'No era el plan original. Por eso terminó siendo el mejor.', likes: '2,401', comments: '86', position: 'center 60%', image: '/images/ramon-miranda/key-art.png' },
    { username: '@ramon.takes.the.longway', location: 'Coastal Highway', time: '18:12', text: 'El camino largo siempre tiene una historia escondida.', likes: '1,872', comments: '42', position: 'center 67%', image: '/images/ramon-miranda/coastal-highway.png' },
    { username: '@miranda.afterdark', location: 'Night Market', time: '20:06', text: 'Guardemos esta noche en algún lugar donde no se borre.', likes: '3,016', comments: '104', position: 'center 58%', image: '/images/ramon-miranda/night-market.png' },
  ],
  archiveImages: [
    { image: '/images/ramon-miranda/key-art.png', mobileImage: '/images/ramon-miranda/key-art-mobile.png', position: 'center 56%', label: '01 / ÚLTIMA LUZ' },
    { image: '/images/ramon-miranda/downtown.png', position: 'center 48%', label: '02 / DESPUÉS DE LAS DIEZ' },
    { image: '/images/ramon-miranda/palm-district.png', position: 'center 50%', label: '03 / SIN PRISA' },
    { image: '/images/ramon-miranda/coastal-highway.png', position: 'center 67%', label: '04 / EL CAMINO LARGO' },
  ],
  finalMessage: 'Algunas aventuras solo necesitan que los dos estén juntos.',
  footerNote: 'A STORY IN MOTION · RAMON / MIRANDA · 2026',
}
