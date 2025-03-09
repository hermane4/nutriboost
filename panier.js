let panier = JSON.parse(localStorage.getItem("panier")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const boutonsAjout = document.querySelectorAll(".produit button");

    boutonsAjout.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            const produit = this.parentElement;
            const nom = produit.querySelector("h2").innerText;
            // Corriger la récupération du prix
            const prixText = produit.querySelector(".prix").innerText.replace("cfa", "").trim();
            const prix = parseInt(prixText.replace(/\s+/g, '').replace(',', ''));

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
        li.innerHTML = `${produit.nom} - ${produit.prix.toLocaleString()} CFA 
        <button onclick="supprimerProduit(${index})">❌</button>`;
        listePanier.appendChild(li);
        total += produit.prix;
    });

    totalPrix.innerText = total.toLocaleString();
}

function supprimerProduit(index) {
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
}

function allerAuPaiement() {
    alert("Redirection vers la page de paiement...");

    // Redirection vers la page de paiement selon le mode choisi
    const modePaiement = prompt("Choisissez votre mode de paiement: (1) Orange Money, (2) Moov Money, (3) Wave");

    if (modePaiement === "1") {
        window.location.href = "https://www.orange.ci/paiement"; // Exemple de page pour Orange Money
    } else if (modePaiement === "2") {
        window.location.href = "https://www.moov.ci/paiement"; // Exemple de page pour Moov Money
    } else if (modePaiement === "3") {
        window.location.href = "https://www.wave.com/paiement"; // Exemple de page pour Wave
    } else {
        alert("Mode de paiement invalide.");
    }
}
