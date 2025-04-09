console.log('WeddingDB script loading...');

const WeddingDB = {
    key: 'wedding_guests',

    // Get all guests
    getAll: function () {
        return new Promise(resolve => {
            const data = localStorage.getItem(this.key);
            resolve(data ? JSON.parse(data) : []);
        });
    },

    // Alias
    getAllGuests: function () {
        return this.getAll();
    },

    // Get single guest by ID (fixed async issue)
    getGuest: function (id) {
        return this.getAll().then(guests => guests.find(g => g.id === id));
    },

    // Save all guests
    save: function (guests) {
        return new Promise(resolve => {
            localStorage.setItem(this.key, JSON.stringify(guests));
            resolve();
        });
    },

    // Add new guest (no auto id/timestamp here — use as-is)
    addGuest: function (guest) {
        return this.getAll().then(guests => {
            guests.push(guest);
            return this.save(guests);
        });
    },

    // Delete guest by ID
    deleteGuest: function (id) {
        return this.getAll().then(guests => {
            const updatedGuests = guests.filter(g => g.id !== id);
            return this.save(updatedGuests);
        });
    },

    // Update guest by ID
    update: function (id, updatedData) {
        return this.getAll().then(guests => {
            const updatedGuests = guests.map(g => {
                if (g.id === id) {
                    return { ...g, ...updatedData };
                }
                return g;
            });
            return this.save(updatedGuests);
        });
    },

    // Stats
    getStats: function () {
        return this.getAll().then(guests => {
            const coming = guests.filter(g => g.attending === 'yes');
            const notComing = guests.filter(g => g.attending === 'no');
            return {
                total: guests.length,
                coming: coming.length,
                comingPersons: coming.reduce((sum, g) => sum + (parseInt(g.persons) || 0), 0),
                notComing: notComing.length
            };
        });
    },

    // Export CSV
    exportCSV: function () {
        return this.getAll().then(guests => {
            const headers = ['Name', 'Mobile', 'City', 'Attending', 'Persons', 'Date'];
            const rows = guests.map(g => [
                `"${g.name}"`,
                g.mobile,
                `"${g.city}"`,
                g.attending === 'yes' ? 'Yes' : 'No',
                g.persons,
                new Date(g.timestamp).toLocaleString()
            ]);
            return [headers, ...rows].map(row => row.join(',')).join('\n');
        });
    }
};

// Make it global
window.WeddingDB = WeddingDB;
