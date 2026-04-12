# Logos de licencias — DB EDICIONES

Esta carpeta contiene los logos oficiales de las licencias que tenemos autorizadas para mostrar en el sitio.

## Cómo agregar un logo

1. Conseguí el logo en **PNG transparente**, preferiblemente 512-1024px de ancho
2. Guardalo con el nombre = slug del tema. Por ejemplo:
   - `bluey.png` → se muestra en el card de Bluey
   - `stranger-things.png` → card de Stranger Things
3. En `src/data/themes.ts`, agregá el campo `logoImage` al tema:

```ts
{
  slug: "bluey",
  // ...
  logoImage: "/images/licenses/bluey.png",
}
```

4. Commit + push. El sitio lo renderiza automáticamente centrado sobre la imagen editorial del card.

## Listado de slugs esperados

- `bluey.png` - Bluey
- `stranger-things.png` - Stranger Things
- `wicked.png` - Wicked
- `minecraft.png` - Minecraft
- `futbol-argentina.png` - AFA / Selección
- `disney-princesas.png` - Disney Princesas
- `spider-man.png` - Spider-Man
- `dragon-ball.png` - Dragon Ball
- `kpop-bts.png` - K-Pop / BTS
- `harry-potter.png` - Harry Potter
- `barbie.png` - Barbie
- `roblox.png` - Roblox
- `taylor-swift.png` - Taylor Swift
- `pokemon.png` - Pokémon
- `among-us.png` - Among Us
- `sprunki.png` - Sprunki
- `guerreras-kpop.png` - Guerreras K-Pop
- `italian-brainrot.png` - Tralalero Tralala
- `99-noches-bosque.png` - 99 Noches en el Bosque
- `cinnamoroll.png` - Cinnamoroll
- `fortnite.png` - Fortnite
- `chicas-superpoderosas.png` - Chicas Superpoderosas

## Nota legal

Solo incluir logos de licencias efectivamente autorizadas. Mostrar logos de marcas sin contrato de licencia puede constituir infracción de trademark.

Los temas sin logoImage se muestran con su imagen editorial original (que es 100% original sin IP protegida).
