import { computed } from 'vue';

interface Props {
  server: StatusItem | BoxItem;
}

export default (props: Props) => {
  const getStatus = computed((): boolean => props.server.status.online4 || props.server.status.online6);

  const getCpuStatus = computed((): number => (props.server as StatusItem).status.cpu === undefined ?
    100 : Math.round((props.server as StatusItem).status.cpu));

  const getRAMStatus = computed((): number => (props.server as StatusItem).status.memory_total === undefined ?
    100 : Math.round(((props.server as StatusItem).status.memory_used / (props.server as StatusItem).status.memory_total * 100)));

  const getHDDStatus = computed((): number => (props.server as StatusItem).status.hdd_total === undefined ?
    100 : Math.round(((props.server as StatusItem).status.hdd_used / (props.server as StatusItem).status.hdd_total * 100)));

  const getProcessBarStatus = computed(() => (data: number) => {
    if (data > 90) return 'error';
    else if (data > 70) return 'warning';
    else return 'success';
  });

  const getUpTime = computed((): string => {
    let str = '-';
    if (getStatus.value) {
      const uptime = props.server.status.uptime;
      if (uptime >= 86400)
        str = `${ Math.floor(uptime / 86400) } 天`;
      else {
        let h: string | number = Math.floor(uptime / 3600);
        let m: string | number = Math.floor(uptime / 60 % 60);
        let s: string | number = Math.floor(uptime % 60);
        h < 10 && (h = `0${ h }`);
        m < 10 && (m = `0${ m }`);
        s < 10 && (s = `0${ s }`);
        str = `${ h }:${ m }:${ s }`;
      }
    }
    return str;
  });

  const tableRowByteConvert = computed(() => (data: number): string => {
    if (data < 1024) return data.toFixed(0) + 'B';
    else if (data < 1024 * 1024) return (data / 1024).toFixed(0) + 'K';
    else if (data < 1024 * 1024 * 1024) return (data / 1024 / 1024).toFixed(1) + 'M';
    else if (data < 1024 * 1024 * 1024 * 1024) return (data / 1024 / 1024 / 1024).toFixed(2) + 'G';
    else return (data / 1024 / 1024 / 1024 / 1024).toFixed(2) + 'T';
  });

  const expandRowByteConvert = computed(() => (data: number): string => {
    if (data < 1024) return data.toFixed(0) + ' B';
    else if (data < 1024 * 1024) return (data / 1024).toFixed(2) + ' KiB';
    else if (data < 1024 * 1024 * 1024) return (data / 1024 / 1024).toFixed(2) + ' MiB';
    else if (data < 1024 * 1024 * 1024 * 1024) return (data / 1024 / 1024 / 1024).toFixed(2) + ' GiB';
    else return (data / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TiB';
  });

  return {
    getStatus,
    getCpuStatus,
    getRAMStatus,
    getHDDStatus,
    getProcessBarStatus,
    getUpTime,
    tableRowByteConvert,
    expandRowByteConvert
  };
};
