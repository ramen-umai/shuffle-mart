// URL から newsid を取得
const params = new URLSearchParams(window.location.search);
const newsId = Number(params.get("newsid"));

// DOM要素
const detailContainer = document.getElementById("news-detail");

// ID が無い場合
if (!newsId) {
  detailContainer.innerHTML = `
    <div class="alert alert-danger">
      <i class="bi bi-exclamation-triangle"></i> 無効なニュースIDです。
    </div>
  `;
  throw new Error("Invalid news ID");
}

// newsData から検索
const item = newsData.find(n => n.id === newsId);

// 見つからない場合
if (!item) {
  detailContainer.innerHTML = `
    <div class="alert alert-danger">
      <i class="bi bi-x-circle"></i> ニュースが見つかりませんでした。
    </div>
  `;
  throw new Error("News not found");
}

// 描画
detailContainer.innerHTML = `
  <div class="card shadow-sm">
    ${item.image
      ? `<img src="${item.image}" class="card-img-top" alt="${item.title}">`
      : `<div class="d-flex justify-content-center align-items-center bg-secondary text-white card-img-top"
           style="height:220px;">
           <i class="bi bi-image fs-1"></i>
         </div>`
    }

    <div class="card-body">
      <h3 class="card-title mb-3">${item.title}</h3>

      <div class="text-muted mb-3">
        <i class="bi bi-calendar"></i> ${item.date}
      </div>

      <p class="card-text fs-5">${item.body}</p>
        ${item.html ? `<br><hr><br><div class="mt-4">${item.html}</div>` : ""}
    </div>
  </div>
`;
