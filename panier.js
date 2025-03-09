function allerAuPaiement() {
    // Calcul du total du panier
    let total = panier.reduce((sum, produit) => sum + produit.prix, 0);

    if (total === 0) {
        alert("Votre panier est vide !");
        return;
    }

    // Configuration de CinetPay
    CinetPay.setConfig({
        apikey: "TA_CLE_CINETPAY", // Remplace par ta clé API
        site_id: "105889553", // Ton site ID
        notify_url: "https://ton-site.com/notification", // URL pour la notification (change cela par ton propre endpoint)
        return_url: "https://ton-site.com/success", // URL de retour après paiement
    });

    // Lancement du paiement CinetPay
    CinetPay.getCheckout({
        transaction_id: "CMD_" + Math.floor(Math.random() * 1000000), // ID unique pour chaque transaction
        amount: total, // Montant total du panier
        currency: "XOF", // Monnaie XOF (CFA)
        channels: "ALL", // Accepter tous les canaux de paiement (Orange Money, Moov, Wave)
        description: "Paiement de votre panier", // Description du paiement
        customer_name: "Nom Client", // Nom du client (à remplacer par la variable ou valeur réelle)
        customer_surname: "Prenom Client", // Prénom du client (à remplacer par la variable ou valeur réelle)
        customer_email: "email@example.com", // Email du client (à remplacer par la variable ou valeur réelle)
        customer_phone_number: "2250700000000", // Numéro du client (à remplacer par la valeur réelle)
    });

    // Gestion de la réponse
    CinetPay.waitResponse(function (data) {
        if (data.status === "ACCEPTED") {
            alert("Paiement réussi !");
            panier = []; // Vider le panier après paiement
            localStorage.setItem("panier", JSON.stringify(panier));
            afficherPanier();
        } else {
            alert("Paiement échoué ou annulé.");
        }
    });
}
