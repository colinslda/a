// script.js
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const fileListElement = document.getElementById('fileList');
    const compressionSection = document.getElementById('compression-section');
    const compressButton = document.getElementById('compressButton');
    const downloadSection = document.getElementById('download-section');
    const downloadLink = document.getElementById('downloadLink');
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');

    let filesToCompress = [];

    uploadButton.addEventListener('click', () => {
        fileInput.click(); // Simule un clic sur l'input file caché
    });

    fileInput.addEventListener('change', (event) => {
        filesToCompress = Array.from(event.target.files);
        fileListElement.innerHTML = ''; // Vide la liste précédente

        if (filesToCompress.length > 0) {
            filesToCompress.forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = file.name;
                fileListElement.appendChild(listItem);
            });
            compressionSection.style.display = 'block'; // Affiche la section compression
            downloadSection.style.display = 'none'; // Cache la section téléchargement
        } else {
            compressionSection.style.display = 'none';
            downloadSection.style.display = 'none';
        }
    });


    compressButton.addEventListener('click', async () => {
        if (filesToCompress.length === 0) {
            alert('Veuillez sélectionner au moins un fichier à compresser.');
            return;
        }

        downloadSection.style.display = 'none'; // Cache la section téléchargement
        progressBar.style.width = '0%';
        progressPercentage.textContent = '0%';
        compressionSection.style.display = 'block'; // Assure que la section de compression est visible


        // Utilisation de jszip pour la compression (assurez-vous d'inclure jszip dans votre projet)
        const zip = new JSZip();

        for (let i = 0; i < filesToCompress.length; i++) {
            const file = filesToCompress[i];
            zip.file(file.name, file); // Ajoute chaque fichier au zip
            const progress = ((i + 1) / filesToCompress.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${Math.round(progress)}%`;
            await new Promise(resolve => setTimeout(resolve, 100)); // Délai pour visualiser la progression (optionnel)
        }

        zip.generateAsync({ type: "blob" }, (metadata) => {
            progressBar.style.width = `${metadata.percent}%`;
            progressPercentage.textContent = `${Math.round(metadata.percent)}%`;
        })
        .then(function(blob) {
            // Blob contient le fichier zip compressé
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadSection.style.display = 'block'; // Affiche la section téléchargement
            compressionSection.style.display = 'none'; // Cache la section compression
        });
    });
});
