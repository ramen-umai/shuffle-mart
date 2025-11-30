  // DOM へ描画
  function renderNews(list) {
    const container = document.getElementById("news-list");
    container.innerHTML = "";
  
    list.forEach(item => {
      const icon = categoryIcon[item.category] || "bi-info-circle";
  
      container.innerHTML += `
        <div class="col-md-4">
        <a href="news-detail.html?newsid=${item.id}" class="text-decoration-none">
          <div class="card shadow-sm h-100">
            ${item.image
              ? `<img src="${item.image}" class="card-img-top" alt="${item.title}">`
              : `<div class="d-flex justify-content-center align-items-center bg-secondary text-white card-img-top" style="height:180px;">
                   <i class="bi bi-image fs-1"></i>
                 </div>`
            }
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <div class="text-muted mb-2">
                <i class="bi bi-calendar"></i> ${item.date}
                &nbsp; / &nbsp;
                <i class="bi ${icon}"></i> ${item.category}
              </div>
              <p class="card-text">${item.body}</p>
            </div>
          </div>
          </a>
        </div>
      `;
    });
  }
  
  renderNews(newsData);

  
