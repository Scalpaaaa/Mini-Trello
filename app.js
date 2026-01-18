document.addEventListener('alpine:init', () => {

    Alpine.data('gestionTaches', () => ({

        nouvelleTache: '',
        taches: [],

        // Variables
        searchQuery: '',
        statusFilter: 'all',

        init() {
            const sauvegarde = localStorage.getItem('mesTaches');
            if (sauvegarde) {
                this.taches = JSON.parse(sauvegarde);
            }

            this.$watch('taches', (valeur) => {
                localStorage.setItem('mesTaches', JSON.stringify(valeur));
            });
        },

        ajouterTache() {
            if (this.nouvelleTache === '') return;
            this.taches.push({
                id: Date.now(),
                titre: this.nouvelleTache,
                description: '',
                statut: 'todo'
            });
            this.nouvelleTache = '';
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

        // Fonction pour obtenir les tâches par statut avec filtres
        obtenirTachesParStatut(statut) {
            return this.tachesFiltrees.filter(tache => tache.statut === statut);
        },

        // Fonction compteur par statut
        compterTaches(statut) {
            return this.obtenirTachesParStatut(statut).length;
        },

        // Fonction confirmation avant suppression
        supprimerAvecConfirmation(id) {
            const tache = this.taches.find(t => t.id === id);
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer "${tache.titre}" ?`)) {
                this.supprimerTache(id);
            }
        },

        // Fonction suppression tâche
        supprimerTache(id) {
            this.taches = this.taches.filter(tache => tache.id !== id);
        }

    }))

});
