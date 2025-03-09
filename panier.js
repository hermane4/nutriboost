function allerAuPaiement() {
    let total = panier.reduce((sum, produit) => sum + produit.prix, 0);

    if (total === 0) {
        alert("Votre panier est vide !");
        return;
    }

    CinetPay.setConfig({
        apikey: "TA_CLE_CINETPAY", // Remplace par ta clé API
        site_id: "ID_DE_TON_SITE", // Remplace par ton site ID
        notify_url: "https://ton-site.com/notification", // URL pour les notifications
        return_url: "https://ton-site.com/success", // URL de retour après paiement
    });

    CinetPay.getCheckout({
        transaction_id: "CMD_" + Math.floor(Math.random() * 1000000), 
        amount: total,
        currency: "XOF",
        channels: "ALL", // Permet d'accepter Orange Money, Moov et Wave
        description: "Paiement de votre panier",
        customer_name: "Nom Client",
        customer_surname: "Prenom Client",
        customer_email: "email@example.com",
        customer_phone_number: "2250700000000", // Remplace par le numéro du client
    });

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
