<script>
let highestZ = 1;

// 🎵 Background music
const bgMusic = document.getElementById("bg-music");
document.addEventListener("click", () => { if(bgMusic.paused) bgMusic.play(); }, { once: true });
document.addEventListener("touchstart", () => { if(bgMusic.paused) bgMusic.play(); }, { once: true });

// Paper class
class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    // --------- Desktop dragging ----------
    document.addEventListener('mousemove', (e) => {
      if(!this.holdingPaper) return;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => { this.holdingPaper = false; });

    // --------- Mobile dragging ----------
    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevMouseX = e.touches[0].clientX;
      this.prevMouseY = e.touches[0].clientY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(!this.holdingPaper) return;
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('touchend', () => { this.holdingPaper = false; });
  }
}

// Init all papers
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
</script>
