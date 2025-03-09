let panier = JSON.parse(localStorage.getItem("panier")) || [];

document.addEventListener("DOMContentLoaded", function() { 
    const boutonsAjout = document.querySelectorAll(".produit button"); 

    boutonsAjout.forEach((btn) => { 
        btn.addEventListener("click", function() { 
            const produit = this.parentElement; 
            const nom = produit.querySelector("h2").innerText; 

            // Nettoyer le prix pour le convertir correctement en nombre
            const prixText = produit.querySelector(".prix").innerText.replace("cfa", "").trim(); 
            const prix = parseFloat(prixText.replace(/\s+/g, '').replace(',', '.')); 

            const produitAjoute = { nom, prix }; 
            panier.push(produitAjoute); // 🔥 Ajout du produit au panier
            localStorage.setItem("panier", JSON.stringify(panier)); 
            afficherPanier(); // 🔥 Mise à jour de l'affichage
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
    if (panier.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    alert("Redirection vers la page de paiement..."); 
    
    const modePaiement = prompt("Choisissez votre mode de paiement:\n(1) Orange Money\n(2) Moov Money\n(3) Wave"); 
    
    if (["1", "2", "3"].includes(modePaiement)) { 
        alert(`Effectuez le paiement via :\nNuméro : +225 0151600402\nMontant : ${panier.reduce((sum, p) => sum + p.prix, 0).toLocaleString()} CFA`);
    } else { 
        alert("Mode de paiement invalide.");
    } 
}
