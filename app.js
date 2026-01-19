document.addEventListener('alpine:init', () => {
    
    
    Alpine.data('gestionTaches', () => ({
        
        
        nouvelleTache: '', 
        taches: [],        // tableau principal qui contient tout
        tacheEnEdition: null, 
        nouveauTitre: '',
        searchQuery: '',
        statusFilter: 'all',

         
        init() {
            // On récupère la sauvegarde locale au démarrage
            const sauvegarde = localStorage.getItem('mesTaches');
            
            if (sauvegarde) {
                this.taches = JSON.parse(sauvegarde);
            }

            // Dès qu'on ajoute/modifie un truc, ça sauvegarde dans le navigateur
            this.$watch('taches', (valeur) => {
                localStorage.setItem('mesTaches', JSON.stringify(valeur));
            }, { deep: true }); // deep: true est essentiel pour surveiller les modifs internes aux objets);
        },

        // Filtration par recherche et statut
        get tachesFiltrees() {
            let filtered = this.taches;

            if (this.searchQuery !== '') {
                filtered = filtered.filter(tache => 
                    tache.titre.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            if (this.statusFilter !== 'all') {
                filtered = filtered.filter(tache => tache.statut === this.statusFilter);
            }

            return filtered;
        },

        obtenirTachesParStatut(statut) {
            return this.tachesFiltrees.filter(tache => tache.statut === statut);
        },

        
        ajouterTache() {
           
            if (this.nouvelleTache === '') return;

            this.taches.push({
                id: Date.now(),
                titre: this.nouvelleTache,
                statut: 'todo' ,
                date: new Date().toLocaleDateString('fr-FR')
            });

            this.nouvelleTache = '';
        },

        // Suppression avec confirmation
        supprimerTache(id) {
            if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
                this.taches = this.taches.filter(t => t.id !== id);
            }
        },

        // Prépare l'édition
        editerTache(tache) {
            this.tacheEnEdition = tache.id;
            this.nouveauTitre = tache.titre;
        },

        // Enregistre la modification
        updateTache(tache) {
            tache.titre = this.nouveauTitre;
            this.tacheEnEdition = null;
        },

        // Petite fonction utilitaire pour compter les tâches par colonne
        compterTaches(statut) {
            return this.taches.filter(t => t.statut === statut).length;
        },

        compterTachesFiltre(statut) {
            return this.obtenirTachesParStatut(statut).length;
        },
    }))
});