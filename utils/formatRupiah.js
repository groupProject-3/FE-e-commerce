export default function formatRupiah(num) {
  let reverse = num.toString().split("").reverse().join("");
  let ribuan = reverse.match(/\d{1,3}/g);
  let result = ribuan.join(".").split("").reverse().join("");
  return result;
}
