gsap.registerPlugin(ScrollTrigger);



const timeline = gsap.timeline();
timeline
  .fromTo(".year1", { x: "-100vw", y: 100 }, { x: "0vw", y: "30vh", duration: 1, ease: Power3.easeOut })
  .fromTo(".year2", { x: "-100vw", y: 100 }, { x: "20vw", y: "30vh", duration: 1, ease: Power3.easeOut })
  .fromTo(".year3", { x: "-100vw", y: 100 }, { x: "40vw", y: "30vh", duration: 1, ease: Power3.easeOut })
  .fromTo(".year4", { x: "-100vw", y: 100 }, { x: "60vw", y: "30vh", duration: 1, ease: Power3.easeOut })
  .fromTo(".idag",  { x: "-100vw", y: 100 }, { x: "80vw", y: "30vh", duration: 1, ease: Power3.easeOut })
  .call(positionArbejde365Line, null)
  .fromTo(".ArbejdeTekst", { x: "0vw", y: "10vh", opacity: 0 }, { x: "0vw", y: "5vh", duration: 1, ease: Power3.Out, opacity: 1 }, "<")
;

function positionArbejde365Line() {
  const year2 = document.querySelector(".year2");
  const idag = document.querySelector(".idag");
  const linje = document.querySelector(".arbejde365");
  const tidslinje = document.querySelector(".tidslinje");

  // Find bounding boxes RELATIVT til .tidslinje
  const tidslinjeRect = tidslinje.getBoundingClientRect();
  const year2Rect = year2.getBoundingClientRect();
  const idagRect = idag.getBoundingClientRect();

  // Midtpunkter ift. tidslinjens venstre kant
  const year2Center = year2Rect.left + year2Rect.width / 2 - tidslinjeRect.left;
  const idagCenter = idagRect.left + idagRect.width / 2 - tidslinjeRect.left;

  // Startpunkt og bredde
  const left = Math.min(year2Center, idagCenter);
  const width = Math.abs(idagCenter - year2Center);

  linje.style.left = left + "px";
  linje.style.width = "0px"; // Start ved 0, så GSAP kan animere

  // Animér til korrekt bredde
  gsap.to(linje, { width: width + "px", duration: 1, ease: "power3.out" });
}

// Når timeline er færdig (eller hvis du vil, så snart .idag er på plads):
timeline.call(positionArbejde365Line, null, ">");

// Hvis du vil gøre det responsivt, så også på window resize:
window.addEventListener('resize', positionArbejde365Line);

const datoElement = document.getElementById("dagens-dato");
const iDag = new Date();
const formatteretDato = iDag.toLocaleDateString("da-DK", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});
datoElement.textContent = formatteretDato;
