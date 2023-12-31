const productoDOM = document.querySelector(".productos__center")
const itemTotales =document.querySelector(".item__total")
const detalles = document.getElementById('detalles')

let carrito = [];
let buttonDOM = [];
let productos  = [];

class UI {

	detalleProducto(id){
		const filtroDato = productos.filter(item => item.id == id)
		let result = ""
		filtroDato.forEach(producto => {
			result += `
			<article class="detalle-grid">
				<img src=${producto.image} alt="${producto.title}" class="img-fluid">
				<div class="detalles-content">
					<h3>${producto.title}</h3>
					<div class="rating">
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bxs-star"></i>
						</span>
						<span>
							<i class="bx bx-star"></i>
						</span>
					</div>
						<p class="price"><b>Precio: </b> $${producto.price}</p>
						<p class="description">
							<b>Descripcion: </b> <span> ${producto.description_product}</span>
						</p>
						<p class="description">
							<span>${producto.description_product}</span>
						</p>
				</div>
			</article>
			`
		});
		detalles.innerHTML = result;
	}

	renderProductos(productos){
		let result = ""
		productos.forEach((producto) =>{
			result += `
			<div class="producto">
			<div class="image__container">
			<img src=${producto.image} alt="">
		</div>
          <div class="producto__footer">
            <h1>${producto.title}</h1>
            <div class="rating">
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bxs-star"></i>
              </span>
              <span>
                <i class="bx bx-star"></i>
              </span>
            </div>
            <div class="price">$${producto.price}</div>
          </div>
          <div class="bottom">
            <div class="btn__group">
              <a href="producto-detalles.html?id=${producto.id}" class="btn view">Vista</a>
            </div>
          </div>
        </div>
				`
		});
		productoDOM.innerHTML = result
	}
	
	singleButton(id){
		return buttonDOM.find(button => parseInt(button.dataset.id) === id)
	}
}



class Storage {
	static saveProduct(obj){
		localStorage.setItem("productos", JSON.stringify(obj))
	}
	static getProductos(id){
		const producto = JSON.parse(localStorage.getItem("productos"))
		return producto.find(product =>product.id === parseFloat(id, 10))
	}
}

class Productos {
  async getProductos() {
    try {
			const result = await fetch("productos.json")
			const data = await result.json()
			const productos = data.items
			return productos
		}catch(err){
			console.log(err)
		}
  }
}

let category = "";

function categoryValue(){
	const ui = new UI();

	category = document.getElementById("category").value
	if(category.length > 0){
		const producto = productos.filter(regx => regx.category === category)
		ui.renderProductos(producto)
	}else{
		ui.renderProductos(productos)
	
	}
}

const query = new URLSearchParams(window.location.search)
let id = query.get('id')

document.addEventListener("DOMContentLoaded", async () =>{
	const productosLista = new Productos();
	const ui = new UI();

	productos = await productosLista.getProductos()
	if(id){
		ui.detalleProducto(id)
		Storage.saveProduct(productos)
	}else{
		ui.renderProductos(productos)
		Storage.saveProduct(productos)
	}
})

