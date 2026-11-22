let panier = [];
const categories = [
  { cle: "entree",  nb: "nbEntree"  },
  { cle: "plat",    nb: "nbPlat"    },
  { cle: "dessert", nb: "nbDessert" }
];
function mettreAJourPanierGlobal() {
  panier = [];
  categories.forEach(c => {
    const select = document.getElementById(c.cle);
    const qte = parseInt(document.getElementById(c.nb).value, 10) || 0;
    if (select.selectedIndex > 0 && qte > 0) {
      const nom = select.options[select.selectedIndex].text.split('(')[0].trim();
      const prix = parseFloat(select.value);
      panier.push({ cle: c.cle, nom: nom, prix: prix, qte: qte });
    }
  });
  afficherPanier();
}
function supprimerDuPanier(index) {
  const c = categories.find(cat => cat.cle === panier[index].cle);
  document.getElementById(c.cle).selectedIndex = 0;
  document.getElementById(c.nb).value = 0;
  mettreAJourPanierGlobal();
}
function afficherPanier() {
  const listeDOM = document.getElementById("liste-panier");
  listeDOM.innerHTML = "";
  let sousTotal = 0;
  panier.forEach((item, index) => {
    const totalLigne = item.prix * item.qte;
    sousTotal += totalLigne;
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.qte}x ${item.nom} (${totalLigne.toFixed(2)} DT)</span>
                    <button type="button" onclick="supprimerDuPanier(${index})">X</button>`;
    listeDOM.appendChild(li);
  });
  const fraisLivraison = (sousTotal > 0 && sousTotal < 40) ? 5 : 0;

  document.getElementById("affichage-soustotal").textContent = sousTotal.toFixed(2) + " DT";
  document.getElementById("affichage-livraison").textContent = fraisLivraison.toFixed(2) + " DT";
  document.getElementById("affichage-total").textContent = (sousTotal + fraisLivraison).toFixed(2) + " DT";
}

mettreAJourPanierGlobal();
