export default function onTab() {
  console.log(`tabbed!`)
  const domCheckWrapper = document.querySelector(`.js-tab`)
  domCheckWrapper.innerHTML = `tabbed: re-enable focus ring`
}
