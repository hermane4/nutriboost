let panier = JSON.parse(localStorage.getItem("panier")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const boutonsAjout = document.querySelectorAll(".produit button");

    boutonsAjout.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const produit = this.parentElement;
            const nom = produit.querySelector("h2").innerText;
            const prix = parseInt(produit.querySelector(".prix").innerText.replace("cfa", "").trim());

            const produitAjoute = { nom, prix };
            panier.push(produitAjoute);

            localStorage.setItem("panier", JSON.stringify(panier));
            afficherPanier();
        });
    });

    afficherPanier();
});

function afficherPanier() {
    const listePanier = document.getElementById("liste-panier");
    const totalPrix = document.getElementById("total-prix");
    
    listePanier.innerHTML = "";
    let total = 0;

    panier.forEach((produit, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${produit.nom} - ${produit.prix} CFA 
        <button onclick="supprimerProduit(${index})">❌</button>`;
        listePanier.appendChild(li);
        total += produit.prix;
    });

    totalPrix.innerText = total;
}

function supprimerProduit(index) {
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
}

function allerAuPaiement() {
    alert("Redirection vers la page de paiement...");
    // Ici, tu peux rediriger vers une vraie page de paiement
}
