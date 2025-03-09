function allerAuPaiement() {
    let total = panier.reduce((sum, produit) => sum + produit.prix, 0);

    if (total === 0) {
        alert("Votre panier est vide !");
        return;
    }

    // Configuration CinetPay
    CinetPay.setConfig({
        apikey: "TA_CLE_CINETPAY", // Remplace par ta clé API CinetPay
        site_id: "105889553", // Ton site_id
        notify_url: "https://ton-site.com/notification", // URL pour la notification
        return_url: "https://ton-site.com/success", // URL de retour après paiement
    });

    // Lancer le paiement CinetPay
    CinetPay.getCheckout({
        transaction_id: "CMD_" + Math.floor(Math.random() * 1000000), // ID unique pour chaque transaction
        amount: total, // Montant à payer
        currency: "XOF", // Monnaie
        channels: "ALL", // Accepter tous les canaux de paiement (Orange Money, Moov, Wave)
        description: "Paiement de votre panier",
        customer_name: "Nom Client", // Nom du client
        customer_surname: "Prenom Client", // Prénom du client
        customer_email: "email@example.com", // Email du client
        customer_phone_number: "2250700000000", // Numéro de téléphone du client
    });

    // Ecoute la réponse du paiement
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
