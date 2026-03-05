import express from 'express';
import path from 'path';

type Item = {
  id: number;
  name: string;
  description: string;
  skills: string[];
};

const sampleData: Item[] = [
  {
    id: 1,
    name: 'Superman',
    description: 'El último hijo de Krypton. Fuerte, vuela y tiene visión de calor.',
    skills: ['Vuelo', 'Superfuerza', 'Visión de calor'],
  },
  {
    id: 2,
    name: 'Batman',
    description: 'Detective experto y maestro estratega. Usa la tecnología y el sigilo.',
    skills: ['Detective', 'Tecnología', 'Sigilo'],
  },
  {
    id: 3,
    name: 'Wonder Woman',
    description: 'Guerrera amazona con fuerza y habilidades de combate excepcionales.',
    skills: ['Fuerza', 'Combate', 'Lazo de la verdad'],
  },
  {
    id: 4,
    name: 'Flash',
    description: 'Velocista extraordinario. Corre a velocidades increíbles y viaja en el tiempo.',
    skills: ['Supervelocidad', 'Reflejos', 'Viaje en el tiempo'],
  },
  {
    id: 5,
    name: 'Iron Man',
    description: 'Genio, multimillonario y filántropo. Traje con tecnología avanzada.',
    skills: ['Traje acorazado', 'Tecnología', 'Ingeniería'],
  },
  {
    id: 6,
    name: 'Spider-Man',
    description: 'Joven héroe con sentido arácnido y agilidad sobrehumana.',
    skills: ['Sentido arácnido', 'Agilidad', 'Trepar paredes'],
  },
  {
    id: 7,
    name: 'Hulk',
    description: 'Cuando se enfada, se transforma en una fuerza imparable de destrucción.',
    skills: ['Ira', 'Superfuerza', 'Resistencia'],
  },
  {
    id: 8,
    name: 'Thor',
    description: 'Dios del trueno, controla el rayo y empuña el martillo Mjolnir.',
    skills: ['Control del rayo', 'Fuerza', 'Mjolnir'],
  },
  {
    id: 9,
    name: 'Captain America',
    description: 'Símbolo de liderazgo y valor, equipado con un escudo indestructible.',
    skills: ['Liderazgo', 'Combate', 'Escudo'],
  },
  {
    id: 10,
    name: 'Black Panther',
    description: 'Rey tecnológico de Wakanda con habilidades físicas mejoradas.',
    skills: ['Agilidad', 'Tecnología', 'Estrategia'],
  },
];

function matches(item: Item, q: string) {
  const s = q.toLowerCase();
  if (item.name.toLowerCase().includes(s)) return true;
  if (item.description.toLowerCase().includes(s)) return true;
  if (item.skills.some((sk) => sk.toLowerCase().includes(s))) return true;
  return false;
}

const app = express();
const publicPath = path.join(__dirname, '..', '..', 'public');
app.use(express.static(publicPath));

app.get('/api/search', (req, res) => {
  const q = ((req.query['q'] as string) || '').trim();
  if (!q) {
    return res.json(sampleData);
  }
  const results = sampleData.filter((it) => matches(it, q));
  return res.json(results);
});

const port = process.env['PORT'] || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
