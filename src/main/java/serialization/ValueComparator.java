package serialization;


import com.mycompany.spiritus.metier.model.Employee;
import java.util.Comparator;
import java.util.Map;


class ValueComparator implements Comparator<Employee> {
    Map<Employee, Long> base;
    
    public  ValueComparator(Map<Employee, Long> base) {
        this.base = base;
    }

    public int compare(Employee a, Employee b) {
        if (base.get(a) >= base.get(b)) {
            return -1;
        } else {
            return 1;
        }
    }
}
