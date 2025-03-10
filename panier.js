let panier = JSON.parse(localStorage.getItem("panier")) || [];

document.addEventListener("DOMContentLoaded", function() { 
    const boutonsAjout = document.querySelectorAll(".produit button"); 

    boutonsAjout.forEach((btn) => { 
        btn.addEventListener("click", function() { 
            const produit = this.parentElement; 
            const nom = produit.querySelector("h2").innerText; 

            // Nettoyer le prix pour le convertir correctement en nombre
            const prixText = produit.querySelector(".prix").innerText.replace("CFA", "").trim();
            const prix = parseFloat(prixText.replace(/\s+/g, '').replace(',', '.'));

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
    alert("Redirection vers le paiement...");

    // Afficher les numéros de paiement au lieu des liens
    const modePaiement = prompt(
        "Choisissez votre mode de paiement:\n1️⃣ Orange Money\n2️⃣ Moov Money\n3️⃣ Wave"
    );

    if (modePaiement === "1") { 
        alert("Payez via Orange Money au +225 0777065750");
    } else if (modePaiement === "2") { 
        alert("Payez via Moov Money au +225 0151600402");
    } else if (modePaiement === "3") { 
        alert("Payez via Wave au +225 0151600402");
    } else { 
        alert("Mode de paiement invalide.");
    }
}
