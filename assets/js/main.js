// ======================
// Datos de productos
// ======================
const productos = [
  {
    id: 1,
    nombre: 'Galvano personalizado',
    precio: 14990,
    img: 'assets/img/galvano.jpg',
  },
  {
    id: 2,
    nombre: 'Juego de posavasos (6 unidades)',
    precio: 8990,
    img: 'assets/img/posavasos.jpg',
  },
  {
    id: 3,
    nombre: 'Llaveros de madera',
    precio: 3990,
    img: 'assets/img/llavero.jpg',
  },
  {
    id: 4,
    nombre: 'Imanes souvenirs',
    precio: 2990,
    img: 'assets/img/iman.jpg',
  },
  {
    id: 5,
    nombre: 'Servilletero',
    precio: 6990,
    img: 'assets/img/servilletero.jpg',
  },
  {
    id: 6,
    nombre: 'Caja para bolsas de té',
    precio: 10990,
    img: 'assets/img/caja.jpg',
  },
  {
    id: 7,
    nombre: 'Marco de cuadro',
    precio: 12990,
    img: 'assets/img/marco_cuadro.jpg',
  },
  {
    id: 8,
    nombre: 'Tabla de cocina',
    precio: 15990,
    img: 'assets/img/tabla.jpg',
  },
];

// Carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarBadge();
}

function actualizarBadge() {
  const count = carrito.length;
  const b1 = document.getElementById('badge-carrito');
  const b2 = document.getElementById('badge-carrito-2');
  const b3 = document.getElementById('badge-carrito-3');
  if (b1) b1.textContent = count;
  if (b2) b2.textContent = count;
  if (b3) b3.textContent = count;
}

// Catálogo
function renderCatalogo() {
  const cont = document.getElementById('catalogo');
  if (!cont) return;
  cont.innerHTML = '';
  productos.forEach((p) => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <article class="card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text mt-auto"><strong>$${p.precio}</strong></p>
          <div class="mt-3">
            <a href="producto.html?id=${p.id}" class="btn btn-outline-primary btn-sm me-2">Ver más</a>
            <button class="btn btn-success btn-sm" data-id="${p.id}">Agregar</button>
          </div>
        </div>
      </article>
    `;
    cont.appendChild(col);
  });

  cont.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
      const id = parseInt(e.target.dataset.id);
      agregarAlCarrito(id);
    }
  });
}

function agregarAlCarrito(id) {
  const p = productos.find((x) => x.id === id);
  if (!p) return;
  carrito.push(p);
  guardarCarrito();
  alert(`${p.nombre} agregado al carrito`);
}

// Detalle
function renderDetalle() {
  const cont = document.getElementById('detalle-producto');
  if (!cont) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const p = productos.find((x) => x.id === id) || productos[0];

  cont.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-md-6">
        <img src="${p.img}" class="img-fluid rounded" alt="${p.nombre}">
      </div>
      <div class="col-md-6">
        <h2>${p.nombre}</h2>
        <p class="h4 text-success">$${p.precio}</p>
        <p>Producto hecho a mano en madera. Ideal para regalo o decoración.</p>
        <div class="mt-4">
          <button id="btn-agregar-detalle" class="btn btn-success me-2">Agregar al carrito</button>
          <a href="index.html" class="btn btn-outline-secondary">Volver</a>
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById('btn-agregar-detalle');
  if (btn)
    btn.addEventListener('click', () => {
      agregarAlCarrito(p.id);
    });
}

function renderCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  if (!lista || !totalEl) return;

  lista.innerHTML = '';
  if (carrito.length === 0) {
    lista.innerHTML =
      '<div class="alert alert-info">Tu carrito está vacío</div>';
    totalEl.textContent = '$0';
    return;
  }

  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement('div');
    li.className =
      'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        <h6 class="mb-0">${item.nombre}</h6>
        <small class="text-muted">$${item.precio}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-danger" data-index="${index}">Eliminar</button>
      </div>
    `;
    lista.appendChild(li);
    total += item.precio;
  });

  totalEl.textContent = `$${total}`;

  lista.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.index) {
      const idx = parseInt(e.target.dataset.index);
      carrito.splice(idx, 1);
      guardarCarrito();
      renderCarrito();
    }
  });
}

function setupCarritoButtons() {
  const vaciar = document.getElementById('vaciar-carrito');
  const pagar = document.getElementById('pagar');

  if (vaciar) {
    vaciar.addEventListener('click', () => {
      if (confirm('¿Vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        renderCarrito();
      }
    });
  }

  if (pagar) {
    pagar.addEventListener('click', () => {
      alert('Compra simulada. Gracias por preferir nuestros productos');
      carrito = [];
      guardarCarrito();
      renderCarrito();
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  actualizarBadge();
  renderCatalogo();
  renderDetalle();
  renderCarrito();
  setupCarritoButtons();
});
