document.addEventListener('alpine:init', () => {
    
    
    Alpine.data('gestionTaches', () => ({
        
        
        nouvelleTache: '', 
        taches: [],        // tableau principal qui contient tout

         
        init() {
            // On récupère la sauvegarde locale au démarrage
            const sauvegarde = localStorage.getItem('mesTaches');
            
            if (sauvegarde) {
                this.taches = JSON.parse(sauvegarde);
            }

            // Dès qu'on ajoute/modifie un truc, ça sauvegarde dans le navigateur
            this.$watch('taches', (valeur) => {
                localStorage.setItem('mesTaches', JSON.stringify(valeur));
            });
        },

        
        ajouterTache() {
           
            if (this.nouvelleTache === '') return;

            this.taches.push({
                id: Date.now(),
                titre: this.nouvelleTache,
                statut: 'todo' 
            });

            this.nouvelleTache = '';
        }
    }))
});