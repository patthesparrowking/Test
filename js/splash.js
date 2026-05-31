        window.addEventListener("load", () => {

            setTimeout(() => {
                move();
            }, 100);

            const splash = document.getElementById("splash-screen");

            setTimeout(() => {
            splash.classList.add("is-hidden");

            setTimeout(() => {
                splash.remove();
            }, 1200);

            }, 2000);

        });

        function move() {
            var elem = document.getElementById("splashScreenProgressBar");   
            var width = 0;
            var id = setInterval(frame, 16);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++; 
                    elem.style.width = width + '%'; 
                    // elem.innerHTML = width * 1  + '%';
                }
            }
        }


        const roundedSVG = document.querySelector("#roundedFrameSvg");

        function drawRoundFrames() {
            const w = roundedSVG.clientWidth;
            const h = roundedSVG.clientHeight;

            roundedSVG.innerHTML = "";

            const frameCount = 1;
            const gap = 12;

            for(let i = 0; i < frameCount; i++) {
                const inset = (i + 1.5) * gap;

                const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

                rect.setAttribute("x", inset);
                rect.setAttribute("y", inset);
                rect.setAttribute("width", w - inset * 2);
                rect.setAttribute("height", h - inset * 2);
                rect.setAttribute("rx", 10 - i *2);
                rect.setAttribute("ry", 10 - i * 2);
                rect.setAttribute("fill", "none");
                rect.setAttribute("stroke", "#AF965C");
                rect.setAttribute("stroke-width", Math.max(1, 1 - i));
                roundedSVG.appendChild(rect);
            }
        }
        drawRoundFrames();



        const svg = document.querySelector("#frameSvg"); 

        function createConcaveFramePath(w, h, inset, r) {
            return `
            M ${inset + r} ${inset}
            H ${w - inset - r}
            A ${r} ${r} 0 0 0 ${w - inset} ${r + inset}
            V ${h - inset - r}
            A ${r} ${r} 0 0 0 ${w - inset - r} ${h - inset}
            H ${inset + r}
            A ${r} ${r} 0 0 0 ${inset} ${h - inset - r}
            V ${ inset + r}
            A ${r} ${r} 0 0 0 ${inset +r} ${inset}
            Z
            `;
        }

        function drawFrames() {
            const w = svg.clientWidth;
            const h = svg.clientHeight;

            svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
            svg.innerHTML = "";

            const frameCount = 2;
            const gap = 10;

            for (let i = 0; i < frameCount; i++) {
                const inset = i * gap;

                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                const currentRadius = Math.max(6, 40 - i * 3);
                const currentStrokeWidth = Math.max(1, 3 - (2 * i))

                path.setAttribute("d", createConcaveFramePath(w, h, inset, currentRadius));
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", "#AF965C");
                path.setAttribute("stroke-width", currentStrokeWidth);

                svg.appendChild(path);
            }
        }

        drawFrames();

        const observer = new ResizeObserver(drawFrames, drawRoundFrames);
        observer.observe(svg), roundedSVG;