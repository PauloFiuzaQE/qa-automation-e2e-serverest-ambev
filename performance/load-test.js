import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 20 }, // Rampa de subida: 20 usuários em 10s
        { duration: '20s', target: 20 }, // Carga constante: Mantém 20 usuários por 20s
        { duration: '10s', target: 0 },  // Rampa de descida: Zera os usuários em 10s
    ],
    thresholds: {

        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const res = http.get('https://serverest.dev/produtos');

    check(res, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta ok (< 500ms)': (r) => r.timings.duration < 500,
    });

    sleep(1);
}