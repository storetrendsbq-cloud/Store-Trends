// Sistema principal de la tienda - Colombia
class TiendaPerfumes {
    constructor() {
        this.carrito = [];
        this.costoEnvio = 19900;
        this.envioGratisDesde = 150000;
        
        this.inicializar();
    }

    inicializar() {
        this.cargarCarrito();
        this.renderizarProductos();
        this.configurarEventos();
        this.actualizarCarritoUI();
    }

    // Sistema de Carrito
    agregarAlCarrito(producto, cantidad = 1) {
        const itemExistente = this.carrito.find(item => item.id === producto.id);
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.carrito.push({
                ...producto,
                cantidad: cantidad
            });
        }
        
        this.guardarCarrito();
        this.actualizarCarritoUI();
        this.mostrarConfirmacion('✅ Producto agregado al carrito');
    }

    eliminarDelCarrito(productoId) {
        this.carrito = this.carrito.filter(item => item.id !== productoId);
        this.guardarCarrito();
        this.actualizarCarritoUI();
    }

    actualizarCantidad(productoId, nuevaCantidad) {
        const item = this.carrito.find(item => item.id === productoId);
        if (item) {
            if (nuevaCantidad <= 0) {
                this.eliminarDelCarrito(productoId);
            } else {
                item.cantidad = nuevaCantidad;
                this.guardarCarrito();
                this.actualizarCarritoUI();
            }
        }
    }

    // Persistencia
    guardarCarrito() {
        localStorage.setItem('carritoPerfumes', JSON.stringify(this.carrito));
    }

    cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carritoPerfumes');
        if (carritoGuardado) {
            this.carrito = JSON.parse(carritoGuardado);
        }
    }

    // Cálculos
    calcularSubtotal() {
        return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    calcularEnvio() {
        const subtotal = this.calcularSubtotal();
        return subtotal >= this.envioGratisDesde ? 0 : this.costoEnvio;
    }

    calcularTotal() {
        return this.calcularSubtotal() + this.calcularEnvio();
    }

    contarItemsCarrito() {
        return this.carrito.reduce((total, item) => total + item.cantidad, 0);
    }

    // Formatear precios en pesos colombianos
    formatearPrecio(precio) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(precio);
    }

    // Renderizar productos en la página
    renderizarProductos() {
        this.renderizarCategoria('hombre', productsData.hombre);
        this.renderizarCategoria('mujer', productsData.mujer);
        this.renderizarCategoria('combos', productsData.combos);
    }

    renderizarCategoria(categoriaId, productos) {
        const grid = document.getElementById(`productsGrid${categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1)}`);
        if (!grid) return;

        grid.innerHTML = productos.map(producto => `
            <div class="product-card">
                <div class="product-image">
                    ${producto.image}
                </div>
                <div class="product-info">
                    <div class="product-category">${this.obtenerNombreCategoria(producto.category)}</div>
                    <h3 class="product-name">${producto.name}</h3>
                    <div class="product-description">
                        <p>${producto.description}</p>
                    </div>
                    
                    <div class="product-pricing">
                        ${producto.originalPrice > producto.price ? `
                            <div class="price-original">${this.formatearPrecio(producto.originalPrice)}</div>
                        ` : ''}
                        <div class="price-current">${this.formatearPrecio(producto.price)}</div>
                    </div>
                    
                    <div class="product-actions">
                        <button class="btn-add-to-cart" onclick="tienda.agregarAlCarrito(${JSON.stringify(producto).replace(/"/g, '&quot;')})">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    obtenerNombreCategoria(categoria) {
        const categorias = {
            'hombre': 'Para Él',
            'mujer': 'Para Ella',
            'combo': 'Combo Especial'
        };
        return categorias[categoria] || categoria;
    }

    // Actualizar interfaz del carrito
    actualizarCarritoUI() {
        this.actualizarContadorCarrito();
        this.actualizarSidebarCarrito();
    }

    actualizarContadorCarrito() {
        const contador = document.querySelector('.cart-count');
        if (contador) {
            const cantidad = this.contarItemsCarrito();
            contador.textContent = cantidad;
        }
    }

    actualizarSidebarCarrito() {
        const itemsCarrito = document.getElementById('cartItems');
        const carritoVacio = document.getElementById('cartEmpty');
        const footerCarrito = document.getElementById('cartFooter');
        
        if (this.carrito.length === 0) {
            carritoVacio.style.display = 'block';
            itemsCarrito.style.display = 'none';
            footerCarrito.style.display = 'none';
        } else {
            carritoVacio.style.display = 'none';
            itemsCarrito.style.display = 'block';
            footerCarrito.style.display = 'block';
            
            // Renderizar items
            itemsCarrito.innerHTML = this.carrito.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${item.image}
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${this.formatearPrecio(item.price)}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="tienda.actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                                <span>${item.cantidad}</span>
                                <button class="quantity-btn" onclick="tienda.actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                            </div>
                            <button class="remove-item" onclick="tienda.eliminarDelCarrito(${item.id})">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Actualizar totales
            this.actualizarTotalesCarrito();
        }
    }

    actualizarTotalesCarrito() {
        const subtotal = this.calcularSubtotal();
        const envio = this.calcularEnvio();
        const total = this.calcularTotal();
        
        document.getElementById('subtotalAmount').textContent = this.formatearPrecio(subtotal);
        document.getElementById('shippingAmount').textContent = envio === 0 ? 'GRATIS' : this.formatearPrecio(envio);
        document.getElementById('totalAmount').textContent = this.formatearPrecio(total);
    }

    // Funciones de UI
    mostrarConfirmacion(mensaje) {
        // Crear notificación temporal
        const notificacion = document.createElement('div');
        notificacion.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--gold);
            color: var(--black);
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notificacion.textContent = mensaje;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 3000);
    }

    abrirCarrito() {
        document.getElementById('cartSidebar').classList.add('active');
    }

    cerrarCarrito() {
        document.getElementById('cartSidebar').classList.remove('active');
    }

    // Checkout simple (en una versión real integrarías Mercado Pago aquí)
    abrirCheckout() {
        if (this.carrito.length === 0) {
            this.mostrarConfirmacion('⚠️ Tu carrito está vacío');
            return;
        }

        const total = this.calcularTotal();
        const mensaje = `¡Hola! Quiero comprar los siguientes productos:%0A%0A` +
            this.carrito.map(item => `• ${item.name} x${item.cantidad} - ${this.formatearPrecio(item.price * item.cantidad)}`).join('%0A') +
            `%0A%0ATotal: ${this.formatearPrecio(total)}%0A%0A¡Confirmo mi pedido!`;
        
        // Aquí pondrías tu número de WhatsApp real
        const whatsappUrl = `https://wa.me/573001234567?text=${mensaje}`;
        window.open(whatsappUrl, '_blank');
    }

    // Configurar eventos
    configurarEventos() {
        // Abrir carrito
        document.getElementById('openCart')?.addEventListener('click', () => {
            this.abrirCarrito();
        });
        
        // Cerrar carrito
        document.getElementById('closeCart')?.addEventListener('click', () => {
            this.cerrarCarrito();
        });
        
        // Clic fuera del carrito para cerrar
        document.addEventListener('click', (e) => {
            const carrito = document.getElementById('cartSidebar');
            const botonCarrito = document.getElementById('openCart');
            
            if (carrito.classList.contains('active') && 
                !carrito.contains(e.target) && 
                !botonCarrito.contains(e.target)) {
                this.cerrarCarrito();
            }
        });
    }
}

// Funciones globales para los botones HTML
function openCart() {
    tienda.abrirCarrito();
}

function closeCart() {
    tienda.cerrarCarrito();
}

function openCheckout() {
    tienda.abrirCheckout();
}

// Inicializar la tienda cuando la página cargue
let tienda;
document.addEventListener('DOMContentLoaded', function() {
    tienda = new TiendaPerfumes();
});

// CSS para animaciones
const estiloAnimaciones = document.createElement('style');
estiloAnimaciones.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(estiloAnimaciones);